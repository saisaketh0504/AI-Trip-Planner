import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({onSelectOption}: any) {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-4xl text-center'>Start planning new <strong className='text-primary'>Trip</strong> using AI</h2>
        <p className='text-center text-gray-400 mt-2'>Discover personalized travel itineraries, find the best destinations, and plan your dream vacation effortlessly with the power of AI. Let our smart assistant do the hard work while you enjoy the journey. </p>
        <div className='flex flex-col gap-2 mt-7'>
                {suggestions.map((suggestions, index)=>(
                    <div key={index} 
                    onClick={()=> onSelectOption(suggestions.titles)}              
                    className='flex items-center gap-2 border 
                                            rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary'>
                        {suggestions.icon}
                        <h2 className='text-lg'>{suggestions.titles}</h2>
                    </div>
                ))}
              </div>
    </div>
  )
}

export default EmptyBoxState
