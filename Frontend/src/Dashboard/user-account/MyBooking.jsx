import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import DoctorCard from '../../components/Doctors/DoctorCard';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const MyBooking = () => {
  const { data, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  // Ensure 'appointments' is an array to avoid errors with map
  const appointments = Array.isArray(data) ? data : [];

  return (
    <div>
      {loading && <Loading />} {/* Show loading indicator while fetching */}
      {error && <Error errMessage={error} />} {/* Show error message if error occurs */}

      {/* Display appointments if not loading and no error */}
      {!loading && !error && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {appointments.map((appointment) => (
            <DoctorCard key={appointment._id} doctor={appointment.doctor} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className='mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor'>
          You did not book any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBooking;
