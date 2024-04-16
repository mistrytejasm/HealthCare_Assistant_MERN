import React from 'react'
import heroImg01 from 'D:/HealthCare Assistant/Frontend/src/assets/images/hero-img01.png';
import heroImg02 from 'D:/HealthCare Assistant/Frontend/src/assets/images/hero-img02.png';
import heroImg03 from 'D:/HealthCare Assistant/Frontend/src/assets/images/hero-img03.png';


const Home = () => {
  return (
    <>
      {/*==== hero section ====== */}
      <>
        <section className='hero__section pt-[60px] 2xl:h-[800px]'>
          <div className='container'>
            <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
              {/* ==== hero content ==== */}
              <div>
                <div className='lg:w-[570px]'>
                  <h1 className='text-[36px] leading-[46px] #0000ff text-headingColor font-[800] md:text-[60px] md:leading-[70px] mb-8  '>
                    We help patient live a healthy, longer life.
                  </h1>
                  <p className='text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam sed atque optio. Itaque ducimus temporibus molestias blanditiis nam cumque distinctio beatae eum error cupiditate, ipsam ab adipisci, eius, et nisi.
                  </p>

                  <button className='btn'>Book An Appointment</button>
                </div>

                {/* ====hero counter ====== */}
                <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row items-center gap-5 lg:gap-[30px]'>
                  <div className="flex flex-col items-center">
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                      30+
                    </h2>
                    <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
                    <p className='text_para'>Years of Experience</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                      15+
                    </h2>
                    <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                    <p className='text_para'>Clinic Location</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                      100%
                    </h2>
                    <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                    <p className='text_para'>Patient Satisfaction</p>

                  </div>
                </div>
              </div>
              {/* ==== hero content ==== */}  
            <div className='flex gap-[30px] justify-end'>
              <div>
                <img className="w-full"  src={heroImg01} alt=" "/>
              </div>
              <div className='mt-[30px]'>
              <img src={heroImg02} alt=" " className='w-full mb-[30px]'/>
              <img src={heroImg03} alt=" " className='w-full'/>

              </div>
            </div>

            </div>
          </div>
        </section>
      </>
    </>
  )
}

export default Home