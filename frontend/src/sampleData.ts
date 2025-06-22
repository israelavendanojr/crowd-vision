export const sampleData: ExtendedCrowdData[] = [
  {
    "id": 'frame_0000_0ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "0_1",
      "0_2",
      "1_0",
      "1_1",
      "1_2",
      "2_2",
      "3_0",
      "3_2",
    ],
    time_stamp: "0:00",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high level of risk across multiple zones due to high crowd densities and potential bottlenecks. Immediate action is required to mitigate these risks, including crowd dispersal measures, enhanced surveillance, and deployment of additional security personnel. A comprehensive review of event planning and site layout is necessary to prevent similar risks in future events.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Implement crowd dispersal measures, enhance surveillance and monitoring, deploy additional security personnel, review and adjust event schedules, and conduct a thorough review of site layout and event planning.",
    frame_summary: "The overall threat assessment indicates a high level of risk across multiple zones due to high crowd densities and potential bottlenecks. Immediate action is required to mitigate these risks, including crowd dispersal measures, enhanced surveillance, and deployment of additional security personnel. A comprehensive review of event planning and site layout is necessary to prevent similar risks in future events.",
  },
  {
    "id": 'frame_0001_1200ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "Zone 1_2",
      "Zone 2_0",
      "Zone 3_0",
      "Zone 3_2",
    ],
    time_stamp: "0:01",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high level of risk due to overcrowding and poor crowd distribution across multiple zones. Immediate intervention is required to manage crowd density, improve infrastructure, and enhance emergency response planning. Continuous monitoring and adaptive management strategies are crucial to mitigate risks and ensure a safe environment for attendees. Several zones exhibit crowd densities significantly higher than recommended limits.",
    insights: "Crowd crush risk in Zone 1_2 and Zone 2_0, Exit blockage risk due to high crowd density, Security deployment needed in high-risk zones, Inadequate sanitary provision in Zone 0_1",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Deploy additional crowd management personnel, implement crowd control measures, enhance surveillance, and review site layouts to improve crowd distribution.",
    frame_summary: "The overall threat assessment indicates a high level of risk due to overcrowding and poor crowd distribution across multiple zones. Immediate intervention is required to manage crowd density, improve infrastructure, and enhance emergency response planning. Continuous monitoring and adaptive management strategies are crucial to mitigate risks and ensure a safe environment for attendees. Several zones exhibit crowd densities significantly higher than recommended limits.",
  },
  {
    "id": 'frame_0002_2400ms',
    risk_level: "Low",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2",
      "0_3",
      "1_3",
      "3_2",
    ],
    time_stamp: "0:02",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The night market event is experiencing high crowd densities in several zones, exceeding recommended limits and posing a high risk of crowd-related incidents. Continuous monitoring and crowd management are necessary to mitigate these risks. Potential bottlenecks and directional conflicts have been identified in multiple zones. Emergency response planning and staff training are also crucial to ensure a safe and enjoyable experience for attendees. The overall threat assessment is Moderate to High.",
    insights: "Crowd crush risk in Zones 0_2, 0_3, 1_3, and 3_2, Potential bottlenecks in Zones 2_1, 2_3, and 3_1, Inadequate crowd management in several zones, Insufficient emergency response planning",
    flags: [
      "HIGH DENSITY",
      "CROWD CRUSH RISK",
    ],
    protocol: "Implement crowd control measures and surveillance in high-risk zones, develop and update emergency response plans, and provide regular training to staff on crowd management and emergency response.",
    frame_summary: "The night market event is experiencing high crowd densities in several zones, exceeding recommended limits and posing a high risk of crowd-related incidents. Continuous monitoring and crowd management are necessary to mitigate these risks. Potential bottlenecks and directional conflicts have been identified in multiple zones. Emergency response planning and staff training are also crucial to ensure a safe and enjoyable experience for attendees. The overall threat assessment is Moderate to High.",
  },
  {
    id: 'frame_0003_3600ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "1_1",
      "1_2",
      "1_3",
    ],
    time_stamp: "0:03",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd situation indicates a high risk level due to overcrowding in Zone 1_1 and moderate to high densities in several other zones. Potential risks include crowd crush, bottlenecks, and directional conflicts. Immediate action is required to manage crowd density and prevent safety incidents. Enhanced monitoring and crowd management strategies are necessary. The situation is being closely monitored.",
    insights: "Crowd crush risk in Zone 1_1, Potential bottlenecks in Zones 1_2 and 1_3, Need for enhanced security deployment",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Implement immediate crowd control measures in Zone 1_1, enhance monitoring across all zones, and adjust event layout or crowd management strategies as necessary. Ensure clear communication channels and define emergency response plans.",
    frame_summary: "The crowd situation indicates a high risk level due to overcrowding in Zone 1_1 and moderate to high densities in several other zones. Potential risks include crowd crush, bottlenecks, and directional conflicts. Immediate action is required to manage crowd density and prevent safety incidents. Enhanced monitoring and crowd management strategies are necessary. The situation is being closely monitored.",
  },
  {
    id: 'frame_0004_4800ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "1_2",
      "2_0",
      "2_2",
    ],
    time_stamp: "0:05",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd situation is critical with high densities in zones 1_2, 2_0, and 2_2, posing significant safety risks. Several zones are at or beyond recommended risk thresholds for crowd density and movement patterns. The overall risk level is high due to overcrowding, inadequate emergency planning, and insufficient crowd management. Immediate interventions are required to mitigate these risks. The situation is being closely monitored.",
    insights: "Crowd crush risk in zone 1_2, Exit blockage potential in zones with complex layouts, Security deployment needed in high-risk zones",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Deploy additional stewards/crowd marshals to manage crowd density and flow, enhance surveillance in high-risk zones, implement crowd control measures, and develop comprehensive emergency response plans including evacuation procedures and first aid response.",
    frame_summary: "The crowd situation is critical with high densities in zones 1_2, 2_0, and 2_2, posing significant safety risks. Several zones are at or beyond recommended risk thresholds for crowd density and movement patterns. The overall risk level is high due to overcrowding, inadequate emergency planning, and insufficient crowd management. Immediate interventions are required to mitigate these risks. The situation is being closely monitored.",
  },
  {
    id: 'frame_0005_6000ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2",
      "1_2",
      "2_0",
      "2_1",
      "2_2",
      "2_3",
      "3_3",
    ],
    time_stamp: "0:06",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high level of risk across multiple zones due to overcrowding and potential bottlenecks. Immediate interventions are required in high-risk zones to prevent crowd disasters. Continuous monitoring and crowd management strategies are essential across all zones. High crowd densities in adjacent zones can lead to cascade risks.",
    insights: "Crowd crush risk in zones 0_2, 1_2, 2_0, 2_2, 2_3, 3_3, Exit blockage potential in zones 1_2, 2_2, Security deployment needed in zones 1_2, 2_0, 2_1, 2_2, 2_3",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Implement crowd dispersal and control measures in high-risk zones, enhance surveillance and monitoring across all zones, develop and communicate emergency response plans, ensure clear escape routes and emergency access.",
    frame_summary: "The overall threat assessment indicates a high level of risk across multiple zones due to overcrowding and potential bottlenecks. Immediate interventions are required in high-risk zones to prevent crowd disasters. Continuous monitoring and crowd management strategies are essential across all zones. High crowd densities in adjacent zones can lead to cascade risks.",
  },
  {
    id: 'frame_0006_7200ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2",
      "1_1",
      "1_2",
      "2_1",
    ],
    time_stamp: "0:07",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk level across the event area due to overcrowding, crowd pressure, and potential bottlenecks in multiple zones. Continuous monitoring and crowd management are critical. Several zones exceed recommended crowd density thresholds, violating safety guidelines. Emergency response planning and training are essential to mitigate these risks.",
    insights: "Crowd crush risk in zones 0_2, 1_1, 1_2, Exit blockage potential in zones 2_0, 3_0, Security deployment needed in high-risk zones",
    flags: [
      "HIGH DENSITY",
      "CROWD CRUSH RISK",
    ],
    protocol: "Implement crowd management strategies across all zones, enhance surveillance and monitoring, develop comprehensive emergency response plans, and conduct regular training and drills for emergency responders.",
    frame_summary: "The overall threat assessment indicates a high risk level across the event area due to overcrowding, crowd pressure, and potential bottlenecks in multiple zones. Continuous monitoring and crowd management are critical. Several zones exceed recommended crowd density thresholds, violating safety guidelines. Emergency response planning and training are essential to mitigate these risks.",
  },
  {
    id: 'frame_0007_8400ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "1_0",
      "2_0",
      "2_3",
    ],
    time_stamp: "0:08",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd density in several zones exceeds recommended limits, posing a high risk to safety. Zones 1_0, 2_0, and 2_3 are of particular concern. Immediate intervention is required to mitigate potential safety risks. Moderate-risk zones require continuous monitoring and preparedness for intervention. Crowd control measures and enhanced surveillance are recommended.",
    insights: "Crowd crush risk in Zones 1_0, 2_0, and 2_3, Potential exit blockage in high-density zones, Security deployment needed in Zones 1_0, 2_0, and 2_3",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Implement crowd control measures, enhance surveillance, and establish clear communication channels between event staff, security, and emergency services. Prioritize Zones 1_0, 2_0, and 2_3 for immediate intervention.",
    frame_summary: "The crowd density in several zones exceeds recommended limits, posing a high risk to safety. Zones 1_0, 2_0, and 2_3 are of particular concern. Immediate intervention is required to mitigate potential safety risks. Moderate-risk zones require continuous monitoring and preparedness for intervention. Crowd control measures and enhanced surveillance are recommended.",
  },
  {
    id: 'frame_0008_9600ms',
    risk_level: "High",
    risk_trend: "Steady",
    hot_zones: [
      "0_0",
      "0_1",
      "1_3",
      "2_0",
      "3_2",
      "3_3",
    ],
    time_stamp: "0:10",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk of overcrowding and crowd disasters in multiple zones. Immediate intervention is required to manage crowd densities, prevent bottlenecks, and ensure safe escape routes. Continuous monitoring and coordination between zones are essential to mitigate risks and prevent a cascade of emergencies. High crowd densities are observed in zones 0_0, 0_1, 1_3, 2_0, 3_2, and 3_3.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Initiate crowd dispersal and restrict entry to high-risk zones. Enhance surveillance and monitoring. Implement crowd control measures and deploy additional personnel. Review and adjust site layouts, develop emergency response plans, and conduct training.",
    frame_summary: "The overall threat assessment indicates a high risk of overcrowding and crowd disasters in multiple zones. Immediate intervention is required to manage crowd densities, prevent bottlenecks, and ensure safe escape routes. Continuous monitoring and coordination between zones are essential to mitigate risks and prevent a cascade of emergencies. High crowd densities are observed in zones 0_0, 0_1, 1_3, 2_0, 3_2, and 3_3.",
  },
  {
    id: 'frame_0009_10800ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "1_0",
      "1_3",
      "2_1",
      "3_1",
    ],
    time_stamp: "0:11",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall risk assessment indicates a high likelihood of crowd-related incidents due to extremely high densities in Zones 1_0 and 1_3, and moderate to high densities in other zones. Immediate intervention is required to manage crowd density and enhance surveillance. Emergency response plans should be activated, and additional security personnel deployed to high-risk areas. Continuous monitoring of crowd movement and density is crucial to prevent overcrowding and potential bottlenecks.",
    insights: "Crowd crush risk in Zones 1_0 and 1_3, Potential bottlenecks in Zones 2_1 and 3_1, Need for enhanced surveillance and security deployment, Risk of directional conflicts in Zones 0_1 and 3_3",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Implement emergency response plans, enhance crowd monitoring and management, ensure clear emergency access routes, and deploy additional security personnel to high-risk zones.",
    frame_summary: "The overall risk assessment indicates a high likelihood of crowd-related incidents due to extremely high densities in Zones 1_0 and 1_3, and moderate to high densities in other zones. Immediate intervention is required to manage crowd density and enhance surveillance. Emergency response plans should be activated, and additional security personnel deployed to high-risk areas. Continuous monitoring of crowd movement and density is crucial to prevent overcrowding and potential bottlenecks.",
  },
  {
    id: 'frame_0010_12000ms',
    risk_level: "High",
    risk_trend: "Steady",
    hot_zones: [
      "0_0",
      "1_1",
      "3_2",
    ],
    time_stamp: "0:12",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall risk assessment is Moderate to High due to observed crowd densities and potential bottlenecks. Zones 0_0, 1_1, and 3_2 are of particular concern due to high crowd densities and potential overcrowding. Immediate attention is required to manage crowd distribution and prevent overcrowding. Potential infrastructure risks and inadequate facilities have been identified in several zones. Enhanced monitoring and crowd management strategies are necessary to mitigate risks.",
    insights: "Crowd crush risk in zones 0_0, 1_1, and 3_2, Exit blockage potential in zones 1_1 and 3_2, Security deployment needed in high-risk zones, Insufficient toilet facilities in zone 1_2",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Deploy additional crowd management personnel to high-risk zones, improve signage in zones with potential bottlenecks, and enhance surveillance in high-risk zones. Establish clear communication channels and define emergency response procedures. Continuously monitor crowd densities and distribution in high-risk zones.",
    frame_summary: "The overall risk assessment is Moderate to High due to observed crowd densities and potential bottlenecks. Zones 0_0, 1_1, and 3_2 are of particular concern due to high crowd densities and potential overcrowding. Immediate attention is required to manage crowd distribution and prevent overcrowding. Potential infrastructure risks and inadequate facilities have been identified in several zones. Enhanced monitoring and crowd management strategies are necessary to mitigate risks.",
  },
  {
    id: 'frame_0011_13200ms',
    risk_level: "High",
    risk_trend: "Decreasing",
    hot_zones: [
      "0_2",
      "1_2",
      "2_0",
      "2_2",
      "3_1",
    ],
    time_stamp: "0:13",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk level due to multiple zones with high crowd densities and potential bottlenecks. Immediate intervention is required to mitigate these risks. Continuous monitoring and coordinated crowd management strategies across zones are crucial to ensuring safety.",
    insights: "Crowd crush risk in zones 0_2 and 1_2, Exit blockage potential in zones 2_0 and 2_2, Security deployment needed in high-risk zones",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Deploy additional security personnel to high-risk zones, enhance surveillance, implement crowd control measures, and develop/update emergency response plans.",
    frame_summary: "The overall threat assessment indicates a high risk level due to multiple zones with high crowd densities and potential bottlenecks. Immediate intervention is required to mitigate these risks. Continuous monitoring and coordinated crowd management strategies across zones are crucial to ensuring safety.",
  },
  {
    id: 'frame_0012_14400ms',
    risk_level: "Medium",
    risk_trend: "Steady",
    hot_zones: [
      "0_1",
      "1_1",
      "2_2",
      "3_2",
    ],
    time_stamp: "0:14",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk level across multiple zones due to overcrowding, potential bottlenecks, and infrastructure risks. Critical intervention requirements include increasing crowd monitoring, implementing crowd control measures, and reviewing emergency response plans. Continuous monitoring and follow-up are necessary to ensure crowd safety.",
    insights: "Crowd crush risk in zones 0_1, 1_1, 2_2, and 3_2, Exit blockage potential in zones 2_2 and 3_2, Security deployment needed in zones with potential bottlenecks",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Implement crowd monitoring and control measures, review and update emergency response plans, and revise the overall event plan to manage crowd density effectively.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk level across multiple zones due to overcrowding, potential bottlenecks, and infrastructure risks. Critical intervention requirements include increasing crowd monitoring, implementing crowd control measures, and reviewing emergency response plans. Continuous monitoring and follow-up are necessary to ensure crowd safety.",
  },
  {
    id: 'frame_0013_15600ms',
    risk_level: "Medium",
    risk_trend: "Steady",
    hot_zones: [
      "0_1",
      "2_0",
      "2_1",
      "2_3",
    ],
    time_stamp: "0:15",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high level of risk across multiple zones due to excessive crowd density, potential bottlenecks, and infrastructure risks. Immediate intervention is required in zones like 0_1, 2_0, 2_1, and 2_3 to prevent potential crowd disasters. Continuous monitoring and crowd management strategies are necessary across all zones to ensure a safe environment.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Deploy additional security personnel to manage and disperse crowds in high-risk zones, ensure clear escape routes, and enhance surveillance.",
    frame_summary: "The overall threat assessment indicates a high level of risk across multiple zones due to excessive crowd density, potential bottlenecks, and infrastructure risks. Immediate intervention is required in zones like 0_1, 2_0, 2_1, and 2_3 to prevent potential crowd disasters. Continuous monitoring and crowd management strategies are necessary across all zones to ensure a safe environment.",
  },
  {
    id: 'frame_0014_16800ms',
    risk_level: "Medium",
    risk_trend: "Steady",
    hot_zones: [
      "Zone 0_0",
      "Zone 0_1",
      "Zone 1_0",
    ],
    time_stamp: "0:16",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd density in several zones exceeds recommended safety guidelines, posing a significant risk of overcrowding and crowd crush. Zone 0_0 is at critical risk, while Zone 0_1 and Zone 1_0 are at high risk. Zone 0_3 is at moderate to high risk. Immediate crowd control measures are necessary.",
    insights: "Crowd crush risk in Zone 0_0, Exit blockage risk in Zone 0_1 and Zone 1_0, Security deployment needed in high-risk zones",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
    ],
    protocol: "Implement crowd control barriers, redirect crowd flow, increase security and medical personnel presence, enhance surveillance and monitoring, and establish clear communication channels for emergency response.",
    frame_summary: "The crowd density in several zones exceeds recommended safety guidelines, posing a significant risk of overcrowding and crowd crush. Zone 0_0 is at critical risk, while Zone 0_1 and Zone 1_0 are at high risk. Zone 0_3 is at moderate to high risk. Immediate crowd control measures are necessary.",
  },
    {
    id: 'frame_0015_18000ms',
    risk_level: "Medium",
    risk_trend: "Decreasing",
    hot_zones: [
      "1_3"
    ],
    time_stamp: "0:18",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd density in Zone 1_3 is critically high at 81 people/m\u00b2, violating safety guidelines and posing a significant risk of crowd crushes or stampedes. Immediate intervention is required to disperse the crowd and reduce density. The situation is severe and requires emergency response measures.",
    insights: "Crowd crush risk, Non-compliance with safety regulations, Exit blockage risk",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Implement crowd dispersal and control measures within 30 minutes, enhance surveillance in high-density zones, and activate emergency response plan.",
    frame_summary: "The crowd density in Zone 1_3 is critically high at 81 people/m\u00b2, violating safety guidelines and posing a significant risk of crowd crushes or stampedes. Immediate intervention is required to disperse the crowd and reduce density. The situation is severe and requires emergency response measures.",
  },
  {
    id: 'frame_0016_19200ms',
    risk_level: "Low",
    risk_trend: "Steady",
    hot_zones: [
      "0_3",
      "1_0",
      "1_1",
      "1_3",
      "2_0"
    ],
    time_stamp: "0:19",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd situation is critical with multiple zones exceeding recommended densities, posing a high risk of overcrowding and trampling hazards. Zones 0_3, 1_0, 1_1, and 2_0 are of particular concern. Immediate crowd control measures and enhanced access point management are necessary. The situation requires continuous monitoring and adjustment of crowd control measures.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed, Overcrowding risk",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Implement crowd control barriers and stewarding in high-risk zones, enhance access point management, and ensure comprehensive information and welfare services are available. Develop and implement an emergency response plan that includes procedures for overcrowding and trampling hazards.",
    frame_summary: "The crowd situation is critical with multiple zones exceeding recommended densities, posing a high risk of overcrowding and trampling hazards. Zones 0_3, 1_0, 1_1, and 2_0 are of particular concern. Immediate crowd control measures and enhanced access point management are necessary. The situation requires continuous monitoring and adjustment of crowd control measures.",
  },
  {
    id: 'frame_0017_20400ms',
    risk_level: "Low",
    risk_trend: "Steady",
    hot_zones: [
      "1_1",
      "2_1"
    ],
    time_stamp: "0:20",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high level of risk due to overcrowding and potential bottlenecks in multiple zones. Crowd density in several zones exceeds recommended safety standards, posing a significant risk to crowd safety. Immediate intervention is required to implement crowd control measures, enhance surveillance, and develop emergency response plans.",
    insights: "Crowd crush risk in Zone 1_1, Potential bottlenecks at entry and exit points, Inadequate signage and lighting in Zone 1_3 and 2_0",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Implement crowd control measures such as barriers, signage, and stewards in high-density zones. Enhance surveillance in zones with high crowd density or potential bottlenecks. Develop and implement emergency response plans for all zones.",
    frame_summary: "The overall threat assessment indicates a high level of risk due to overcrowding and potential bottlenecks in multiple zones. Crowd density in several zones exceeds recommended safety standards, posing a significant risk to crowd safety. Immediate intervention is required to implement crowd control measures, enhance surveillance, and develop emergency response plans.",
  },
  {
    id: 'frame_0018_21600ms',
    risk_level: "Low",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "1_0",
      "2_1"
    ],
    time_stamp: "0:22",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk of overcrowding and related safety incidents across multiple zones. Immediate intervention is required to disperse crowds in critical zones and enhance surveillance. Short-term and medium-term interventions will focus on implementing crowd management strategies and reviewing event layouts.",
    insights: "Crowd crush risk, Potential for trampling, Inadequate lighting in Zones 1_1 and 3_2",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Immediate crowd dispersal in Zones 0_0 and 2_1, enhanced surveillance across all zones, and implementation of crowd management strategies in Zones 0_1, 0_2, 1_2, 2_0, and 2_3.",
    frame_summary: "The overall threat assessment indicates a high risk of overcrowding and related safety incidents across multiple zones. Immediate intervention is required to disperse crowds in critical zones and enhance surveillance. Short-term and medium-term interventions will focus on implementing crowd management strategies and reviewing event layouts.",
  },
  {
    id: 'frame_0019_22800ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "1_2",
      "2_3",
      "3_0",
      "3_2"
    ],
    time_stamp: "0:23",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk of crowd-related incidents across multiple zones due to high crowd densities, potential bottlenecks, and inadequate infrastructure. Immediate and proactive measures are required to mitigate these risks. Several zones exceed recommended crowd density thresholds, violating safety guidelines and regulations.",
    insights: "Crowd crush risk, Potential bottlenecks, Inadequate crowd management, Insufficient emergency planning",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "OVER CROWDING"
    ],
    protocol: "Implement crowd dispersal measures, restrict access to high-risk zones, deploy additional crowd control personnel, and develop comprehensive emergency response plans.",
    frame_summary: "The overall threat assessment indicates a high risk of crowd-related incidents across multiple zones due to high crowd densities, potential bottlenecks, and inadequate infrastructure. Immediate and proactive measures are required to mitigate these risks. Several zones exceed recommended crowd density thresholds, violating safety guidelines and regulations.",
  },
  {
    id: 'frame_0020_24000ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2"
    ],
    time_stamp: "0:24",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd situation is critical with Zone 0_2 severely overcrowded, exceeding safe density thresholds. Immediate action is required to disperse the crowd and prevent serious safety risks. Other zones have lower densities but still pose a moderate risk due to potential overcrowding.",
    insights: "Crowd crush risk, Exit blockage risk, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Immediate crowd dispersal in Zone 0_2, enhanced crowd monitoring across all zones, and activation of emergency response plan.",
    frame_summary: "The crowd situation is critical with Zone 0_2 severely overcrowded, exceeding safe density thresholds. Immediate action is required to disperse the crowd and prevent serious safety risks. Other zones have lower densities but still pose a moderate risk due to potential overcrowding.",
  },
  {
    id: 'frame_0021_25200ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "1_1",
      "2_1",
      "2_2",
      "3_1",
      "3_2"
    ],
    time_stamp: "0:25",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk level due to high crowd densities in several zones. Immediate intervention is required to manage crowd density and prevent overcrowding-related incidents. Key recommendations include enhancing crowd monitoring and implementing crowd control measures.",
    insights: "Crowd crush risk in zones with high density, Potential exit blockage in zones 1_1, 2_2, 3_1, 3_2, Security deployment needed in high-risk zones",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Enhance crowd monitoring, implement crowd control measures, deploy additional crowd management personnel, and ensure clear emergency response plans",
    frame_summary: "The overall threat assessment indicates a high risk level due to high crowd densities in several zones. Immediate intervention is required to manage crowd density and prevent overcrowding-related incidents. Key recommendations include enhancing crowd monitoring and implementing crowd control measures.",
  },
  {
    id: 'frame_0022_26400ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "1_0",
      "1_1",
      "2_0",
      "2_3"
    ],
    time_stamp: "0:26",
    image: "./backend/data/test_video_4k.mp4",
    summary: "High crowd densities in zones 1_0, 1_1, 2_0, and 2_3 pose a significant risk of crowd-related incidents. Immediate intervention is required to mitigate these risks. Continuous monitoring and adaptive management strategies are crucial across all zones.",
    insights: "Crowd crush risk in high-density zones, Potential bottlenecks in zones 0_1, 1_2, 2_2, 3_1, Inadequate toilet facilities in zones 0_2 and 3_1",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "POTENTIAL BOTTLENECKS"
    ],
    protocol: "Implement crowd control measures including barriers, signage, and trained personnel. Enhance surveillance in high-risk zones. Develop and communicate emergency response plans to all personnel.",
    frame_summary: "High crowd densities in zones 1_0, 1_1, 2_0, and 2_3 pose a significant risk of crowd-related incidents. Immediate intervention is required to mitigate these risks. Continuous monitoring and adaptive management strategies are crucial across all zones.",
  },
  {
    id: 'frame_0023_27600ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "0_1",
      "0_2",
      "1_1",
      "2_1",
      "2_3"
    ],
    time_stamp: "0:28",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd situation across various zones indicates a high level of risk due to high crowd densities and potential bottlenecks. Several zones exceed recommended crowd density guidelines, posing significant safety risks. Immediate intervention is required to manage crowd density and enhance surveillance. Emergency response planning is crucial for all zones, particularly those with high crowd density or potential bottlenecks. The overall threat assessment indicates a need for prioritized action.",
    insights: "Crowd crush risk, Exit blockage risk, Security deployment needed, Potential noise exposure risk, Bottlenecks observed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "POTENTIAL BOTTLENECKS"
    ],
    protocol: "Implement immediate crowd management interventions in high-risk zones, enhance surveillance in zones with potential bottlenecks or high-density clustering, and develop comprehensive emergency response plans for all zones.",
    frame_summary: "The crowd situation across various zones indicates a high level of risk due to high crowd densities and potential bottlenecks. Several zones exceed recommended crowd density guidelines, posing significant safety risks. Immediate intervention is required to manage crowd density and enhance surveillance. Emergency response planning is crucial for all zones, particularly those with high crowd density or potential bottlenecks. The overall threat assessment indicates a need for prioritized action.",
  },
  {
    id: 'frame_0024_28800ms',
    risk_level: "Medium",
    risk_trend: "Stable",
    hot_zones: [
      "0_2",
      "1_1",
      "1_2",
      "2_0",
      "2_2"
    ],
    time_stamp: "0:29",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk level across various zones due to crowd density, potential bottlenecks, and directional conflicts. Critical intervention requirements include enhancing crowd monitoring, implementing crowd control measures, and reviewing emergency response plans. Ongoing monitoring and assessment are crucial to mitigate potential risks and ensure a safe environment for all attendees. The situation requires immediate attention to prevent overcrowding and potential crowd surges.",
    insights: "Crowd crush risk in Zone 0_2, Potential bottlenecks in Zones 1_2, 2_0, 2_1, 2_2, 3_0, 3_3, Directional conflicts in Zones 1_1, 1_2, 2_0, 2_1, 2_2, 3_1, 3_3",
    flags: [
      "HIGH DENSITY",
      "POTENTIAL CROWD SURGE",
      "EMERGENCY CROWD - CRUSH RISK"
    ],
    protocol: "Enhance crowd monitoring in Zones 0_2, 1_1, 1_2, 2_0, and 2_2. Implement crowd control measures in Zones 1_1, 1_2, 2_0, and 2_2. Review and update emergency response plans for Zones 0_2, 1_2, 2_0, and 3_0.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk level across various zones due to crowd density, potential bottlenecks, and directional conflicts. Critical intervention requirements include enhancing crowd monitoring, implementing crowd control measures, and reviewing emergency response plans. Ongoing monitoring and assessment are crucial to mitigate potential risks and ensure a safe environment for all attendees. The situation requires immediate attention to prevent overcrowding and potential crowd surges.",
  },
    {
    id: 'frame_0025_30000ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2",
      "1_1",
      "2_0"
    ],
    time_stamp: "0:30",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk of crowd-related incidents in several zones, particularly Zone 0_2, Zone 1_1, and Zone 2_0. Immediate intervention is required to mitigate these risks. Crowd density in these zones exceeds recommended safety guidelines, and there is a potential for bottlenecks and directional conflicts.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Implement a comprehensive crowd management plan, including crowd dispersal, infrastructure adjustments, and increased security presence. Review and update emergency response plans to ensure compliance with safety guidelines.",
    frame_summary: "The overall threat assessment indicates a high risk of crowd-related incidents in several zones, particularly Zone 0_2, Zone 1_1, and Zone 2_0. Immediate intervention is required to mitigate these risks. Crowd density in these zones exceeds recommended safety guidelines, and there is a potential for bottlenecks and directional conflicts.",
  },
  {
    id: 'frame_0026_31200ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_3",
      "2_0",
      "2_3",
      "1_1",
      "1_3",
      "2_1",
      "3_3"
    ],
    time_stamp: "0:31",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk level across multiple zones due to potential overcrowding, bottlenecks, and infrastructure risks. Immediate intervention is required to implement crowd management strategies and ensure emergency preparedness. Zones 2_0 and 2_3 are at high risk due to extreme overcrowding.",
    insights: "Crowd crush risk in Zone 2_0 and 2_3, Potential bottlenecks in multiple zones, Inadequate emergency access paths, Insufficient toilet facilities",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Implement crowd monitoring and management strategies, ensure emergency response plans are in place, and provide clear signage and information to attendees. Continuously monitor crowd dynamics and refine crowd management strategies as needed.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk level across multiple zones due to potential overcrowding, bottlenecks, and infrastructure risks. Immediate intervention is required to implement crowd management strategies and ensure emergency preparedness. Zones 2_0 and 2_3 are at high risk due to extreme overcrowding.",
  },
  {
    id: 'frame_0027_32400ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "0_1",
      "0_2",
      "0_3",
      "1_1",
      "2_0",
      "3_3"
    ],
    time_stamp: "0:32",
    image: "./backend/data/test_video_4k.mp4",
    summary: "Multiple zones exhibit high crowd densities exceeding recommended safety thresholds, indicating a significant risk of crowd-related incidents. Immediate intervention is required in high-risk zones. Moderate-risk zones require monitoring to prevent escalation. The overall situation demands enhanced crowd management and safety measures.",
    insights: "Crowd crush risk in Zone 0_1 and Zone 2_0, Potential bottlenecks in Zone 0_0 and Zone 1_2, Security deployment needed in high-density areas, Risk of overcrowding in Zone 1_1 and Zone 1_3",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "CROWD CONTROL REQUIRED"
    ],
    protocol: "Deploy additional stewards and security personnel, activate crowd control barriers, enhance public address systems, and implement a phased crowd dispersal plan for high-density areas. Conduct real-time crowd density monitoring and adjust interventions as needed.",
    frame_summary: "Multiple zones exhibit high crowd densities exceeding recommended safety thresholds, indicating a significant risk of crowd-related incidents. Immediate intervention is required in high-risk zones. Moderate-risk zones require monitoring to prevent escalation. The overall situation demands enhanced crowd management and safety measures.",
  },
  {
    id: 'frame_0028_33600ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "1_0",
      "2_0",
      "0_1",
      "0_2"
    ],
    time_stamp: "0:34",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk of crowd-related incidents due to high crowd densities, potential bottlenecks, and inadequate infrastructure. Zones 1_0 and 2_0 are at high risk due to extremely high crowd densities. Immediate action is required to mitigate these risks.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Establish a clear Incident Command System (ICS), deploy additional crowd management personnel, improve signage and wayfinding, and conduct regular safety meetings.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk of crowd-related incidents due to high crowd densities, potential bottlenecks, and inadequate infrastructure. Zones 1_0 and 2_0 are at high risk due to extremely high crowd densities. Immediate action is required to mitigate these risks.",
  },
  {
    id: 'frame_0029_34800ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2",
      "0_3",
      "3_1"
    ],
    time_stamp: "0:35",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall risk assessment indicates a moderate to high risk level across various zones due to high crowd densities, potential bottlenecks, and inadequate emergency access and exits.",
    insights: "Crowd crush risk, Exit blockage, Insufficient toilet facilities",
    flags: [
      "HIGH DENSITY",
      "POTENTIAL BOTTLENECKS",
      "EMERGENCY ACCESS ISSUES"
    ],
    protocol: "Implement crowd control measures, enhance monitoring, and ensure clear emergency access and exits in the short-term; review and adjust crowd management strategies, assess and improve toilet facilities, and establish dedicated vehicular routes in the medium-term; continuously monitor and adapt crowd management strategies and update emergency response plans in the long-term.",
    frame_summary: "The overall risk assessment indicates a moderate to high risk level across various zones due to high crowd densities, potential bottlenecks, and inadequate emergency access and exits.",
  },
  {
    id: 'frame_0030_36000ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "0_1",
      "2_2"
    ],
    time_stamp: "0:36",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The event site is experiencing high crowd densities in several zones, exceeding recommended thresholds and posing a significant risk of overcrowding and crowd crush. Zones 0_0, 0_1, and 2_2 are of particular concern. Immediate intervention is required to mitigate these risks.",
    insights: "Crowd crush risk, Potential bottlenecks, Inadequate risk assessment",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Deploy crowd management personnel to high-risk zones, implement real-time crowd monitoring, and activate emergency response plans. Ensure clear signage and controlled access points to manage crowd flow.",
    frame_summary: "The event site is experiencing high crowd densities in several zones, exceeding recommended thresholds and posing a significant risk of overcrowding and crowd crush. Zones 0_0, 0_1, and 2_2 are of particular concern. Immediate intervention is required to mitigate these risks.",
  },
  {
    id: 'frame_0031_37200ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_1",
      "0_3"
    ],
    time_stamp: "0:37",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd density in Zone 0_3 is significantly exceeding safe limits, posing an immediate risk of crowd crush. Zones 0_1 also shows high risk due to exceeding recommended density. Immediate crowd control and dispersal measures are necessary.",
    insights: "Crowd crush risk, Exit blockage potential, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Activate Emergency Response Plan, deploy additional security to Zones 0_1 and 0_3, and initiate crowd dispersal from Zone 0_3.",
    frame_summary: "The crowd density in Zone 0_3 is significantly exceeding safe limits, posing an immediate risk of crowd crush. Zones 0_1 also shows high risk due to exceeding recommended density. Immediate crowd control and dispersal measures are necessary.",
  },
  {
    id: 'frame_0032_38400ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_1",
      "2_1",
      "2_3",
      "3_0"
    ],
    time_stamp: "0:38",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk level due to crowd density and potential bottlenecks in several zones. High crowd density is observed in zones 0_1, 2_1, 2_3, and 3_0. Potential bottlenecks are identified in zones 1_3, 2_3, and 3_2. Insufficient lighting and toilet facilities are noted in zones 2_2 and 1_1, respectively.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed, Infrastructure risk",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "INFRASTRUCTURE RISK"
    ],
    protocol: "Deploy additional crowd management personnel to high-risk zones, enhance monitoring of high-density areas, address potential bottlenecks, and provide additional lighting and toilet facilities as needed. Develop and implement comprehensive emergency response plans, including evacuation procedures and first aid provisions.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk level due to crowd density and potential bottlenecks in several zones. High crowd density is observed in zones 0_1, 2_1, 2_3, and 3_0. Potential bottlenecks are identified in zones 1_3, 2_3, and 3_2. Insufficient lighting and toilet facilities are noted in zones 2_2 and 1_1, respectively.",
  },
  {
    id: 'frame_0033_39600ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "0_1",
      "0_2",
      "2_0",
      "2_1"
    ],
    time_stamp: "0:40",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd density in several zones exceeds recommended thresholds, posing a significant risk of crowd-related incidents. High-risk zones include 0_0, 0_1, 0_2, 2_0, and 2_1. Immediate intervention is required to prevent overcrowding and reduce the risk of incidents.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed, Potential bottlenecks in zones 0_3, 1_1, 2_3, 3_1",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "IMMEDIATE INTERVENTION REQUIRED"
    ],
    protocol: "Deploy crowd control barriers or fencing in high-risk zones, increase stewards or security personnel, redirect people to less crowded areas, enhance monitoring and surveillance, develop and implement an emergency response plan.",
    frame_summary: "The crowd density in several zones exceeds recommended thresholds, posing a significant risk of crowd-related incidents. High-risk zones include 0_0, 0_1, 0_2, 2_0, and 2_1. Immediate intervention is required to prevent overcrowding and reduce the risk of incidents.",
  },
  {
    id: 'frame_0034_40800ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "2_0",
      "0_3",
      "3_0"
    ],
    time_stamp: "0:41",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The comprehensive safety analysis across all zones reveals high crowd density and potential safety risks in several areas, necessitating immediate crowd management interventions and continuous monitoring.",
    insights: "Crowd crush risk, Potential bottlenecks, Infrastructure risks, Escape route issues",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "POTENTIAL BOTTLENECKS"
    ],
    protocol: "Implement continuous monitoring, crowd management strategies, and emergency preparedness across all zones, with a focus on high-risk areas.",
    frame_summary: "The comprehensive safety analysis across all zones reveals high crowd density and potential safety risks in several areas, necessitating immediate crowd management interventions and continuous monitoring.",
  },
    {
    id: 'frame_0025_30000ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2",
      "1_1",
      "2_0"
    ],
    time_stamp: "0:30",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a high risk of crowd-related incidents in several zones, particularly Zone 0_2, Zone 1_1, and Zone 2_0. Immediate intervention is required to mitigate these risks. Crowd density in these zones exceeds recommended safety guidelines, and there is a potential for bottlenecks and directional conflicts.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Implement a comprehensive crowd management plan, including crowd dispersal, infrastructure adjustments, and increased security presence. Review and update emergency response plans to ensure compliance with safety guidelines.",
    frame_summary: "The overall threat assessment indicates a high risk of crowd-related incidents in several zones, particularly Zone 0_2, Zone 1_1, and Zone 2_0. Immediate intervention is required to mitigate these risks. Crowd density in these zones exceeds recommended safety guidelines, and there is a potential for bottlenecks and directional conflicts.",
  },
  {
    id: 'frame_0026_31200ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_3",
      "2_0",
      "2_3",
      "1_1",
      "1_3",
      "2_1",
      "3_3"
    ],
    time_stamp: "0:31",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk level across multiple zones due to potential overcrowding, bottlenecks, and infrastructure risks. Immediate intervention is required to implement crowd management strategies and ensure emergency preparedness. Zones 2_0 and 2_3 are at high risk due to extreme overcrowding.",
    insights: "Crowd crush risk in Zone 2_0 and 2_3, Potential bottlenecks in multiple zones, Inadequate emergency access paths, Insufficient toilet facilities",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Implement crowd monitoring and management strategies, ensure emergency response plans are in place, and provide clear signage and information to attendees. Continuously monitor crowd dynamics and refine crowd management strategies as needed.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk level across multiple zones due to potential overcrowding, bottlenecks, and infrastructure risks. Immediate intervention is required to implement crowd management strategies and ensure emergency preparedness. Zones 2_0 and 2_3 are at high risk due to extreme overcrowding.",
  },
  {
    id: 'frame_0027_32400ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "0_1",
      "0_2",
      "0_3",
      "1_1",
      "2_0",
      "3_3"
    ],
    time_stamp: "0:32",
    image: "./backend/data/test_video_4k.mp4",
    summary: "Multiple zones exhibit high crowd densities exceeding recommended safety thresholds, indicating a significant risk of crowd-related incidents. Immediate intervention is required in high-risk zones. Moderate-risk zones require monitoring to prevent escalation. The overall situation demands enhanced crowd management and safety measures.",
    insights: "Crowd crush risk in Zone 0_1 and Zone 2_0, Potential bottlenecks in Zone 0_0 and Zone 1_2, Security deployment needed in high-density areas, Risk of overcrowding in Zone 1_1 and Zone 1_3",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "CROWD CONTROL REQUIRED"
    ],
    protocol: "Deploy additional stewards and security personnel, activate crowd control barriers, enhance public address systems, and implement a phased crowd dispersal plan for high-density areas. Conduct real-time crowd density monitoring and adjust interventions as needed.",
    frame_summary: "Multiple zones exhibit high crowd densities exceeding recommended safety thresholds, indicating a significant risk of crowd-related incidents. Immediate intervention is required in high-risk zones. Moderate-risk zones require monitoring to prevent escalation. The overall situation demands enhanced crowd management and safety measures.",
  },
  {
    id: 'frame_0028_33600ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "1_0",
      "2_0",
      "0_1",
      "0_2"
    ],
    time_stamp: "0:34",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk of crowd-related incidents due to high crowd densities, potential bottlenecks, and inadequate infrastructure. Zones 1_0 and 2_0 are at high risk due to extremely high crowd densities. Immediate action is required to mitigate these risks.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Establish a clear Incident Command System (ICS), deploy additional crowd management personnel, improve signage and wayfinding, and conduct regular safety meetings.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk of crowd-related incidents due to high crowd densities, potential bottlenecks, and inadequate infrastructure. Zones 1_0 and 2_0 are at high risk due to extremely high crowd densities. Immediate action is required to mitigate these risks.",
  },
  {
    id: 'frame_0029_34800ms',
    risk_level: "Medium",
    risk_trend: "Increasing",
    hot_zones: [
      "0_2",
      "0_3",
      "3_1"
    ],
    time_stamp: "0:35",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall risk assessment indicates a moderate to high risk level across various zones due to high crowd densities, potential bottlenecks, and inadequate emergency access and exits.",
    insights: "Crowd crush risk, Exit blockage, Insufficient toilet facilities",
    flags: [
      "HIGH DENSITY",
      "POTENTIAL BOTTLENECKS",
      "EMERGENCY ACCESS ISSUES"
    ],
    protocol: "Implement crowd control measures, enhance monitoring, and ensure clear emergency access and exits in the short-term; review and adjust crowd management strategies, assess and improve toilet facilities, and establish dedicated vehicular routes in the medium-term; continuously monitor and adapt crowd management strategies and update emergency response plans in the long-term.",
    frame_summary: "The overall risk assessment indicates a moderate to high risk level across various zones due to high crowd densities, potential bottlenecks, and inadequate emergency access and exits.",
  },
  {
    id: 'frame_0030_36000ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "0_1",
      "2_2"
    ],
    time_stamp: "0:36",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The event site is experiencing high crowd densities in several zones, exceeding recommended thresholds and posing a significant risk of overcrowding and crowd crush. Zones 0_0, 0_1, and 2_2 are of particular concern. Immediate intervention is required to mitigate these risks.",
    insights: "Crowd crush risk, Potential bottlenecks, Inadequate risk assessment",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Deploy crowd management personnel to high-risk zones, implement real-time crowd monitoring, and activate emergency response plans. Ensure clear signage and controlled access points to manage crowd flow.",
    frame_summary: "The event site is experiencing high crowd densities in several zones, exceeding recommended thresholds and posing a significant risk of overcrowding and crowd crush. Zones 0_0, 0_1, and 2_2 are of particular concern. Immediate intervention is required to mitigate these risks.",
  },
  {
    id: 'frame_0031_37200ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_1",
      "0_3"
    ],
    time_stamp: "0:37",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd density in Zone 0_3 is significantly exceeding safe limits, posing an immediate risk of crowd crush. Zones 0_1 also shows high risk due to exceeding recommended density. Immediate crowd control and dispersal measures are necessary.",
    insights: "Crowd crush risk, Exit blockage potential, Security deployment needed",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY"
    ],
    protocol: "Activate Emergency Response Plan, deploy additional security to Zones 0_1 and 0_3, and initiate crowd dispersal from Zone 0_3.",
    frame_summary: "The crowd density in Zone 0_3 is significantly exceeding safe limits, posing an immediate risk of crowd crush. Zones 0_1 also shows high risk due to exceeding recommended density. Immediate crowd control and dispersal measures are necessary.",
  },
  {
    id: 'frame_0032_38400ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_1",
      "2_1",
      "2_3",
      "3_0"
    ],
    time_stamp: "0:38",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The overall threat assessment indicates a moderate to high risk level due to crowd density and potential bottlenecks in several zones. High crowd density is observed in zones 0_1, 2_1, 2_3, and 3_0. Potential bottlenecks are identified in zones 1_3, 2_3, and 3_2. Insufficient lighting and toilet facilities are noted in zones 2_2 and 1_1, respectively.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed, Infrastructure risk",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "INFRASTRUCTURE RISK"
    ],
    protocol: "Deploy additional crowd management personnel to high-risk zones, enhance monitoring of high-density areas, address potential bottlenecks, and provide additional lighting and toilet facilities as needed. Develop and implement comprehensive emergency response plans, including evacuation procedures and first aid provisions.",
    frame_summary: "The overall threat assessment indicates a moderate to high risk level due to crowd density and potential bottlenecks in several zones. High crowd density is observed in zones 0_1, 2_1, 2_3, and 3_0. Potential bottlenecks are identified in zones 1_3, 2_3, and 3_2. Insufficient lighting and toilet facilities are noted in zones 2_2 and 1_1, respectively.",
  },
  {
    id: 'frame_0033_39600ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "0_1",
      "0_2",
      "2_0",
      "2_1"
    ],
    time_stamp: "0:40",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The crowd density in several zones exceeds recommended thresholds, posing a significant risk of crowd-related incidents. High-risk zones include 0_0, 0_1, 0_2, 2_0, and 2_1. Immediate intervention is required to prevent overcrowding and reduce the risk of incidents.",
    insights: "Crowd crush risk, Exit blockage, Security deployment needed, Potential bottlenecks in zones 0_3, 1_1, 2_3, 3_1",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "IMMEDIATE INTERVENTION REQUIRED"
    ],
    protocol: "Deploy crowd control barriers or fencing in high-risk zones, increase stewards or security personnel, redirect people to less crowded areas, enhance monitoring and surveillance, develop and implement an emergency response plan.",
    frame_summary: "The crowd density in several zones exceeds recommended thresholds, posing a significant risk of crowd-related incidents. High-risk zones include 0_0, 0_1, 0_2, 2_0, and 2_1. Immediate intervention is required to prevent overcrowding and reduce the risk of incidents.",
  },
  {
    id: 'frame_0034_40800ms',
    risk_level: "High",
    risk_trend: "Increasing",
    hot_zones: [
      "0_0",
      "2_0",
      "0_3",
      "3_0"
    ],
    time_stamp: "0:41",
    image: "./backend/data/test_video_4k.mp4",
    summary: "The comprehensive safety analysis across all zones reveals high crowd density and potential safety risks in several areas, necessitating immediate crowd management interventions and continuous monitoring.",
    insights: "Crowd crush risk, Potential bottlenecks, Infrastructure risks, Escape route issues",
    flags: [
      "EMERGENCY CROWD - CRUSH RISK",
      "HIGH DENSITY",
      "POTENTIAL BOTTLENECKS"
    ],
    protocol: "Implement continuous monitoring, crowd management strategies, and emergency preparedness across all zones, with a focus on high-risk areas.",
    frame_summary: "The comprehensive safety analysis across all zones reveals high crowd density and potential safety risks in several areas, necessitating immediate crowd management interventions and continuous monitoring.",
  }
];