import React from 'react'
import Graphs from './Graphs';

const Dashboard = () => {
  return (
    <div className='pt-32 pr-16 ml-80'>
              <div className='text-3xl'><b>Dashboard</b></div>
              <div className='flex'>
                <div className='w-2/3 '>
                  <Graphs/>
                </div>
                <div className='w-1/3 flex flex-col'>
                  <div className='h-1/3 ml-4 bg-blue-500 p-2 text-white border border-black'>
                    <div className='flex flex-col justify-center items-center text-center py-2'>
                      <div className='text-xl' >Total Amount</div>
                      <div className='text-6xl'>&#8377;10,000</div>
                    </div>
                  </div>
                  <div className='h-1/3 my-2 ml-4 bg-yellow-500 text-white border border-black'>
                    <div className='flex flex-col justify-center items-center text-center py-2'>
                      <div className='text-xl' >Orders this Month</div>
                      <div className='text-6xl'>1023</div>
                    </div>
                  </div>
                  <div className='h-1/3 mt-2 ml-4 bg-green-500 text-white border border-black'>
                    <div className='flex flex-col justify-center items-center text-center py-2'>
                      <div className='text-xl' >Total Revenue this Month</div>
                      <div className='text-6xl'>&#8377;100</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
  )
}

export default Dashboard