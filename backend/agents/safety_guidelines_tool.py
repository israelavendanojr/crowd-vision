import os
from dotenv import load_dotenv
from rag_utils import (
    extract_pdf_text,
    chunk_documents,
    embed_chunks,
    load_vectorstore,
    search_similar_chunks,
    call_llama_api
)

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=os.path.abspath(env_path))

def initialize_from_pdf_folder(folder_path):
    if not os.path.exists(folder_path):
        print(f"Error: Folder not found at {folder_path}")
        return False

    pdf_files = [f for f in os.listdir(folder_path) if f.lower().endswith('.pdf')]
    if not pdf_files:
        print(f"No PDF files found in {folder_path}")
        return False

    all_chunks, total_chars = [], 0
    for pdf_file in pdf_files:
        try:
            pdf_path = os.path.join(folder_path, pdf_file)
            text = extract_pdf_text(pdf_path)
            total_chars += len(text)
            chunks = chunk_documents(text)
            for chunk in chunks:
                all_chunks.append({'text': chunk, 'source': pdf_file})
            print(f"{pdf_file}: {len(chunks)} chunks")
        except Exception as e:
            print(f"Error processing {pdf_file}: {e}")

    if not all_chunks:
        print("No chunks created.")
        return False

    print(f"Total: {total_chars} characters, {len(all_chunks)} chunks.")
    chunk_texts = [chunk['text'] for chunk in all_chunks]
    success = embed_chunks(chunk_texts)

    if success:
        import pickle
        with open("data/safety_vector_index_sources.pkl", 'wb') as f:
            pickle.dump(all_chunks, f)

    return success

def initialize_from_pdf(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found at {pdf_path}")
        return False
    text = extract_pdf_text(pdf_path)
    chunks = chunk_documents(text)
    return embed_chunks(chunks)

# Optional test entrypoint
if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    folder_path = os.path.join(script_dir, "guidelines")
    success = initialize_from_pdf_folder(folder_path)
    print("Initialization success:", success)
 