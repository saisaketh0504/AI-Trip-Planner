"use client"
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/ui/timeline';
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { div } from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';

// const TRIP_DATA = {
//     "destination": "Paris, France",
//     "duration": "5 Days, 4 Nights",
//     "origin": "Hyderabad, India",
//     "budget": "₹1,50,000 (Approx.)",
//     "group_size": "2 People",
//     "hotels": [
//       {
//         "hotel_name": "Hotel Eiffel Seine",
//         "hotel_address": "3 Boulevard de Grenelle, 75015 Paris, France",
//         "price_per_night": "₹12,500",
//         "hotel_image_url": "https://dummyimage.com/600x400/000/fff&text=Hotel+Eiffel+Seine",
//         "geo_coordinates": {
//           "latitude": 48.8543,
//           "longitude": 2.2932
//         },
//         "rating": 4.3,
//         "description": "A boutique-style hotel located within walking distance of the Eiffel Tower, offering modern rooms and beautiful views of the Seine River."
//       },
//       {
//         "hotel_name": "Le Meurice",
//         "hotel_address": "228 Rue de Rivoli, 75001 Paris, France",
//         "price_per_night": "₹45,000",
//         "hotel_image_url": "https://dummyimage.com/600x400/222/fff&text=Le+Meurice",
//         "geo_coordinates": {
//           "latitude": 48.8656,
//           "longitude": 2.3286
//         },
//         "rating": 4.8,
//         "description": "A luxury 5-star hotel blending historic charm with modern elegance, situated opposite the Tuileries Garden."
//       }
//     ],
//     "itinerary": [
//       {
//         "day": 1,
//         "day_plan": "Arrival in Paris, Eiffel Tower & Seine River Cruise",
//         "best_time_to_visit_day": "Evening",
//         "activities": [
//           {
//             "place_name": "Eiffel Tower",
//             "place_details": "Iconic landmark of Paris offering panoramic city views.",
//             "place_image_url": "https://dummyimage.com/600x400/444/fff&text=Eiffel+Tower",
//             "geo_coordinates": {
//               "latitude": 48.8584,
//               "longitude": 2.2945
//             },
//             "place_address": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
//             "ticket_pricing": "₹2,000 per person",
//             "time_travel_each_location": "15 mins from hotel",
//             "best_time_to_visit": "Sunset"
//           },
//           {
//             "place_name": "Seine River Cruise",
//             "place_details": "Relaxing boat ride offering views of Paris monuments lit up at night.",
//             "place_image_url": "https://dummyimage.com/600x400/555/fff&text=Seine+Cruise",
//             "geo_coordinates": {
//               "latitude": 48.8584,
//               "longitude": 2.3000
//             },
//             "place_address": "Port de la Bourdonnais, 75007 Paris, France",
//             "ticket_pricing": "₹1,200 per person",
//             "time_travel_each_location": "5 mins walk from Eiffel Tower",
//             "best_time_to_visit": "Night"
//           }
//         ]
//       },
//       {
//         "day": 2,
//         "day_plan": "Louvre Museum & Notre-Dame Cathedral",
//         "best_time_to_visit_day": "Morning and Afternoon",
//         "activities": [
//           {
//             "place_name": "Louvre Museum",
//             "place_details": "World’s largest art museum and a historic monument in Paris.",
//             "place_image_url": "https://dummyimage.com/600x400/666/fff&text=Louvre+Museum",
//             "geo_coordinates": {
//               "latitude": 48.8606,
//               "longitude": 2.3376
//             },
//             "place_address": "Rue de Rivoli, 75001 Paris, France",
//             "ticket_pricing": "₹1,500 per person",
//             "time_travel_each_location": "20 mins from hotel",
//             "best_time_to_visit": "Morning"
//           },
//           {
//             "place_name": "Notre-Dame Cathedral",
//             "place_details": "Famous Gothic cathedral with impressive architecture.",
//             "place_image_url": "https://dummyimage.com/600x400/777/fff&text=Notre-Dame",
//             "geo_coordinates": {
//               "latitude": 48.8529,
//               "longitude": 2.3500
//             },
//             "place_address": "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France",
//             "ticket_pricing": "Free entry, guided tours cost ₹800",
//             "time_travel_each_location": "10 mins from Louvre",
//             "best_time_to_visit": "Afternoon"
//           }
//         ]
//       },
//       {
//         "day": 3,
//         "day_plan": "Palace of Versailles Day Trip",
//         "best_time_to_visit_day": "Morning till Evening",
//         "activities": [
//           {
//             "place_name": "Palace of Versailles",
//             "place_details": "A UNESCO World Heritage site and the royal residence of France’s kings.",
//             "place_image_url": "https://dummyimage.com/600x400/888/fff&text=Palace+of+Versailles",
//             "geo_coordinates": {
//               "latitude": 48.8049,
//               "longitude": 2.1204
//             },
//             "place_address": "Place d'Armes, 78000 Versailles, France",
//             "ticket_pricing": "₹2,500 per person",
//             "time_travel_each_location": "1 hour train ride from Paris",
//             "best_time_to_visit": "Morning"
//           }
//         ]
//       },
//       {
//         "day": 4,
//         "day_plan": "Montmartre & Sacré-Cœur Basilica",
//         "best_time_to_visit_day": "Afternoon till Evening",
//         "activities": [
//           {
//             "place_name": "Montmartre",
//             "place_details": "Artistic hilltop district with cafes, artists, and beautiful streets.",
//             "place_image_url": "https://dummyimage.com/600x400/999/fff&text=Montmartre",
//             "geo_coordinates": {
//               "latitude": 48.8867,
//               "longitude": 2.3431
//             },
//             "place_address": "18th Arrondissement, Paris, France",
//             "ticket_pricing": "Free",
//             "time_travel_each_location": "30 mins from hotel",
//             "best_time_to_visit": "Late Afternoon"
//           },
//           {
//             "place_name": "Sacré-Cœur Basilica",
//             "place_details": "Famous white-domed basilica with panoramic city views.",
//             "place_image_url": "https://dummyimage.com/600x400/aaa/fff&text=Sacré-Cœur",
//             "geo_coordinates": {
//               "latitude": 48.8867,
//               "longitude": 2.3431
//             },
//             "place_address": "35 Rue du Chevalier de la Barre, 75018 Paris, France",
//             "ticket_pricing": "Free",
//             "time_travel_each_location": "10 mins walk from Montmartre",
//             "best_time_to_visit": "Sunset"
//           }
//         ]
//       },
//       {
//         "day": 5,
//         "day_plan": "Shopping & Departure",
//         "best_time_to_visit_day": "Morning",
//         "activities": [
//           {
//             "place_name": "Champs-Élysées & Arc de Triomphe",
//             "place_details": "Famous shopping avenue and historic triumphal arch.",
//             "place_image_url": "https://dummyimage.com/600x400/bbb/fff&text=Champs-Élysées",
//             "geo_coordinates": {
//               "latitude": 48.8738,
//               "longitude": 2.2950
//             },
//             "place_address": "Place Charles de Gaulle, 75008 Paris, France",
//             "ticket_pricing": "Free to walk, Arc de Triomphe entry ₹1,000",
//             "time_travel_each_location": "15 mins from hotel",
//             "best_time_to_visit": "Morning"
//           }
//         ]
//       }
//     ]
//   }



function Itinerary() {
  //@ts-ignore
  const {tripDetailInfo, setTripDetailInfo} = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo|null>(null);
  
  useEffect(()=>{
    tripDetailInfo&&setTripData(tripDetailInfo)
  },[tripDetailInfo])

  const data = tripData?[
    {
      title: "Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel, index)=>(
            <HotelCardItem hotel={hotel} key={index}/>
          ))}
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayDate)=>({
      title: `Day ${dayDate?.day}`,
      content: (
        <div >
          <p className='mb-2 font-bold text-primary text-xl'> Best Time :{dayDate?.best_time_to_visit_day}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {dayDate?.activities.map((activity, index)=>(
            <PlaceCardItem activity={activity}/>
          ))}
          </div>
        </div>
      )
    }))
      

  ]:[];
  return (
    <div className="relative w-full h-[83vh] overflow-y-auto no-scrollbar">
      {tripData ? <Timeline data={data} tripData={tripData} />
      :
      <div>
      <Image src={'https://images.pexels.com/photos/2916820/pexels-photo-2916820.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=750&w=1260'} 
      alt='travel' width={'800'} height={800} className='w-full h-full object-cover rounded-3xl'
      />
      <h2 className='flex gap-2 text-3xl text-white left-20 items-center absolute bottom-20'><ArrowLeft/>Getting to know you to build perfect trip here...</h2>

      </div>
      }
    </div>
  );
}

export default Itinerary
