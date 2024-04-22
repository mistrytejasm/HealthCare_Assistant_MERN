import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import MyBooking from './MyBooking';
import Profile from './Profile';
import useFetchData from '../../hooks/useFetchData'; // Assuming this hook fetches data
import { BASE_URL } from '../../config';

import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState('booking');
  const navigate = useNavigate();

  // Fetch user data
  const { data: userData, loading, error } = useFetchData(`${BASE_URL}/users/profile/me`);

  console.log(userData, "userData")

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/login', { replace: true });
  };

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>

        {loading && !error && <Loading/>}

        { error && !loading && <Error errMessage={error}/>}

        {
          !loading && !error && <div className='grid md:grid-cols-3 gap-10'>
          <div className='pb-[50px] px-[30px] rounded-md'>
            <div className='flex items-center justify-center'>
              <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                <img src={userData.photo} alt='' className='w-full h-full rounded-full' />
              </figure>
            </div>

            <div className='text-center mt-4'>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <>
                  <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{userData.name}</h3>
                  <p className='text-textColor text-[15px] leading-6 font-medium'>{userData.email}</p>
                  <p className='text-textColor text-[15px] leading-6 font-medium'>
                    Blood Type: <span className='ml-2 text-headingColor text-[22px] leading-8'>{userData.bloodType}</span>
                  </p>
                </>
              )}
            </div>

            <div className='mt-[50px] md:mt-[100px]'>
              <button onClick={handleLogout} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
                Logout
              </button>
              <button
                className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                Delete Account
              </button>
            </div>
          </div>

          <div className='md:col-span-2 md:px-[30px]'>
            <div>
              <button onClick={() => setTab('bookings')} className={`${tab === 'bookings' ? 'bg-primaryColor text-white' : ''} p-2 me-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                My Bookings
              </button>

              <button onClick={() => setTab('settings')} className={`${tab === 'settings' ? 'bg-primaryColor text-white' : ''} py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                Profile Settings
              </button>
            </div>

            {tab === "bookings" && <MyBooking />}
            {tab === "settings" && <Profile user={userData} />}
          </div>
        </div>
        }
      </div>
    </section>
  );
};

export default MyAccount;
