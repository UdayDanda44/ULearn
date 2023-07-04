import React from 'react'

const About = () => {
  return (
    <div className='flex justify-center items-center h-[100vh] text-2xl bg-about_bg'>
        <p className='  w-[100vh] rounded-lg p-10  text-slate-400'>
        Online classrooms have become the new normal for students and teachers since the  COVID-19 pandemic. Students now communicate with teachers over video conferencing apps to study and keep up to date with their course. To aid students during such times and make it easier for students to study remotely, we came up with the idea of developing a website which contains content related to the course they would like to learn.

        We’ve used the frameworks react and bootstrap to develop the user interface.The database we’ve used to store the data is mongoDB and to connect the database and the user interface we have used node JS and express.And to send http requests we have used thunder client.

        </p>
    </div>
  )
}

export default About