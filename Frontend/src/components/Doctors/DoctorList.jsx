import DoctorCard from './DoctorCard';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../Error/Error';

const DoctorList = () => {
  const { data = [], loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <>
      {loading && <Loader />} {/* Show loader while fetching */}
      {error && <Error message={`Error: ${error}`} />} {/* Display error message */}

      {!loading && !error && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {data.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        !loading && !error && ( // Fallback if there's no data
          <div className="text-center mt-5 text-gray-500">No doctors found</div>
        )
      )}
    </>
  );
};

export default DoctorList;
