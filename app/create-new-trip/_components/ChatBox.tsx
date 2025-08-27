"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { log } from "console";
import { Loader, Loader2, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import FinalUi from "./FinalUi";
import SelectDays from "./SelectDays";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from 'uuid';


type Message = {
  role: string,
  content: string,
  ui?: string,
};

export type TripInfo = {
  budget: string,
  destination: string,
  duration: string,
  group_size: string,
  origin: string,
  hotels: Hotel[],
  itinerary: Itinerary[]
}

export type Hotel={
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_img_url: string
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  description: string;
};

export type Activity={
  place_name: string;
  place_details: string;
  place_image_url: string
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};

export type Itinerary={
  day:number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[]
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<TripInfo>(); 
  const saveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
  const {userDetail, setUserDetail} = useUserDetail();
  //@ts-ignore
  const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
//   const onSend = async () => {
//   if (!userInput?.trim() || loading) return; // prevent spam clicks
//   setLoading(true); 
//   const input = userInput; // keep value before clearing
//   setUserInput('');

//   const newMsg: Message = {
//     role: 'user',
//     content: input,
//   };

//   setMessages((prev: Message[]) => [...prev, newMsg]);

//   let attempt = 0;
//   const maxRetries = 3;

//   while (attempt < maxRetries) {
//     try {
//       const result = await axios.post("/api/aimodel", {
//         messages: [...messages, newMsg],
//         isFinal: isFinal
//       });

//       console.log("TRIP", result.data);

//       if (!isFinal) {
//         setMessages((prev: Message[]) => [
//           ...prev,
//           {
//             role: 'assistant',
//             content: result?.data?.resp,
//             ui: result?.data?.ui
//           }
//         ]);
//       } else {
//         setTripDetail(result?.data?.trip_plan);
//         setTripDetailInfo(result?.data?.trip_plan);
//         const tripId = uuidv4();
//         await saveTripDetail({
//           tripDetail: result?.data?.trip_plan,
//           tripId: tripId,
//           uid: userDetail?._id
//         });
//       }

//       break; // ✅ success → exit loop
//     } catch (err: any) {
//       if (err.response?.status === 429) {
//         attempt++;
//         const delay = Math.pow(2, attempt) * 1000; // exponential backoff
//         console.warn(`Rate limit hit, retrying in ${delay / 1000}s...`);
//         await new Promise((res) => setTimeout(res, delay));
//       } else {
//         console.error("API error:", err);
//         setMessages((prev: Message[]) => [
//           ...prev,
//           {
//             role: 'assistant',
//             content: "⚠️ Oops! Something went wrong. Please try again.",
//           }
//         ]);
//         break;
//       }
//     }
//   }

//   setLoading(false);
// };



//orginal
const onSend = async () => {
  if (!userInput?.trim()) return;

  setLoading(true);
  
  const newMsg: Message = {
    role: 'user',
    content: userInput ?? '',
  };
  
  setUserInput('');
  // Add user message
  setMessages((prev: Message[]) => [...prev, newMsg]);

  try {
    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal,
    });

    console.log("TRIP", result.data);

    // If not final, show assistant response
    !isFinal && setMessages((prev: Message[]) => [
        ...prev,
        {
          role: 'assistant',
          content: result?.data?.resp,
          ui: result?.data?.ui,
        },
      ]);

    // If final, save trip details
    if (isFinal) {
      setTripDetail(result?.data?.trip_plan);
      setTripDetailInfo(result?.data?.trip_plan);
      const tripId = uuidv4();
      await saveTripDetail({
        tripDetail: result?.data?.trip_plan,
        tripId: tripId,
        uid: userDetail?._id,
      });
    }
  } catch (err) {
    console.error("API Error:", err);
    setMessages((prev: Message[]) => [
      ...prev,
      {
        role: "assistant",
        content: "⚠️ Something went wrong. Please try again.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};



  const RenderGenerativeUi = (ui: string) => {
    if(ui=='budget'){
      //Budget UI Componenet
      return <BudgetUi onSelectedOption={(v:string)=>{setUserInput(v); onSend()}}/>
    }else if(ui == 'groupSize'){
      //Group size UI Componenet
      return <GroupSizeUi onSelectedOption={(v:string)=>{setUserInput(v); onSend()}}/>
    }else if(ui=='tripDuration'){
      // return <SelectDays onSelectedOption={(v:string)=>{setUserInput(v); onSend()}}/>
    }else if(ui=='tripDuration'){
    } else if(ui=='final'){
      return <FinalUi viewTrip={()=>console.log()}
      disable={!tripDetail}
      />
    }

    return null
  }

  useEffect(()=>{
    const lastMsg = messages[messages.length-1];
    if(lastMsg?.ui=='final'){
      setIsFinal(true);
      setUserInput('Ok, Great!')
      // onSend();
    }
  }, [messages])

  useEffect(()=>{
    if(isFinal && userInput){
      onSend();
    }
  }, [isFinal]);

  return (
    <div className="h-[85vh] flex flex-col">
      {messages.length===0 && 
        <EmptyBoxState onSelectOption = {(v:string) => {setUserInput(v); onSend()}}/>
      }
      {/* Display messages */}
      <section className="flex-1 overflow-y-auto p-4">
      {messages.map((msg:Message, index)=>(
        msg.role=='user'?
          <div className="flex justify-end mt-2" key={index}>
            <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
              {msg.content}
            </div>
          </div> :
          <div className="flex justify-start mt-2" key={index}>
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              {msg.content}
              {RenderGenerativeUi(msg.ui??'')}
            </div>
          </div>
      ))}
          {loading && <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin"/>
            </div>
          </div>}
      </section>
      {/* User input */}
      <section>
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start typing here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}
          />
          <Button
            size={"icon"}
            className="cursor-pointer absolute bottom-6 right-6"
            onClick={() => onSend()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
