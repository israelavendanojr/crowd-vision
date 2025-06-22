import fitz  # PyMuPDF
import os
import requests
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.preprocessing import normalize
from dotenv import load_dotenv

# Load environment
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=os.path.abspath(env_path))

embedder = SentenceTransformer('paraphrase-MiniLM-L3-v2')
documents = []
index = None

def extract_pdf_text(filepath):
    doc = fitz.open(filepath)
    return "\n".join([page.get_text() for page in doc])

def chunk_documents(text, chunk_size=1000, chunk_overlap=200):
    chunks, start = [], 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if end < len(text):
            last_period = chunk.rfind('.')
            last_newline = chunk.rfind('\n')
            break_point = max(last_period, last_newline)
            if break_point > start + chunk_size // 2:
                chunk = text[start:break_point + 1]
                end = break_point + 1
        chunks.append(chunk.strip())
        start = end - chunk_overlap
        if start >= len(text): break
    return [c for c in chunks if c]

def embed_chunks(chunks, persist_path="backend/data/safety_vector_index"):
    global documents, index
    documents = chunks
    print("Creating embeddings...")
    embeddings = normalize(embedder.encode(chunks))
    print("Building FAISS index...")
    index = faiss.IndexFlatIP(embeddings.shape[1])
    index.add(embeddings.astype('float32'))
    os.makedirs(os.path.dirname(persist_path), exist_ok=True)
    faiss.write_index(index, f"{persist_path}.index")
    with open(f"{persist_path}.docs", 'wb') as f:
        pickle.dump(documents, f)
    print(f"Vector store saved with {len(chunks)} chunks")
    return True

def load_vectorstore(persist_path="backend/data/safety_vector_index"):
    global documents, index
    try:
        index = faiss.read_index(f"{persist_path}.index")
        with open(f"{persist_path}.docs", 'rb') as f:
            documents = pickle.load(f)
        print(f"Loaded vector store with {len(documents)} chunks")
        return True
    except Exception as e:
        print(f"Could not load vector store: {e}")
        return False

def search_similar_chunks(query, top_k=3):
    global documents, index, embedder
    if index is None or not documents:
        return []
    query_embedding = embedder.encode([query])
    scores, indices = index.search(query_embedding.astype('float32'), top_k)
    return [
        {'text': documents[idx], 'score': scores[0][i]}
        for i, idx in enumerate(indices[0]) if idx != -1 and idx < len(documents)
    ]

def call_llama_api(prompt):
    api_key = os.getenv('LLAMA_API_KEY')
    base_url = os.getenv('LLAMA_BASE_URL', '').rstrip('/')
    if not api_key or not base_url:
        return "Error: LLAMA_API_KEY or LLAMA_BASE_URL not set"

    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": "Llama-4-Maverick-17B-128E-Instruct-FP8",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 500,
        "temperature": 0.7
    }

    try:
        response = requests.post(f"{base_url}/chat/completions", headers=headers, json=payload, timeout=30)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            return f"API Error {response.status_code}: {response.text}"
    except Exception as e:
        return f"Error calling Llama API: {str(e)}"
