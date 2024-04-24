import { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import uploadImageToCloudinary from './../../utils/uploadCloudinary'
import { BASE_URL, token } from './../../config'
import { toast } from 'react-toastify'

const Profile = ({ doctorData }) => {
  const [fromData, setFormData] = useState({
    name: doctorData.name ?? '',
    email: doctorData.email ?? '',
    phone: doctorData.phone ?? '',
    bio: doctorData.bio ?? '',
    gender: doctorData.gender ?? '',
    specialization: doctorData.specialization ?? '',
    ticketprice: doctorData.ticketprice ?? 0,
    qualifications: doctorData.qualifications ?? [], // correct initialization
    experiences: doctorData.experiences ?? [],
    timeSlots: doctorData.timeSlots ?? [],
    about: doctorData.about ?? '',
    photo: doctorData.photo ?? null,
  });

  // useEffect(() => {
  //   setFormData({
  //     name: doctorData?.name,
  //     email: emailData?.email,
  //     phone: doctorData?.phone,
  //     bio: doctorData?.bio,
  //     gender: doctorData?.gender,
  //     specialization: doctorData.specialization,
  //     ticketprice: doctorData.ticketprice,
  //     qualifications: doctorData.qualifications, 
  //     experiences: doctorData.experiences ?? [],
  //     timeSlots: doctorData.timeSlots ?? [],
  //     about: doctorData.about ?? '',
  //     photo: doctorData.photo ?? null,
  //   })
  // })

  const handleInputChange = e => {

    setFormData({ ...fromData, [e.target.name]: e.target.value })
  }

  const handleFileInputChange = async event => {
    const file = event.target.files[0]
    const data = await uploadImageToCloudinary(file);

    console.log(data);
    setFormData({ ...fromData, photo: data?.url })
  };

  // Profile.jsx

const updateProfileHandler = async (e) => {
  e.preventDefault();

  console.log("Updating profile with data:", fromData); // debugging
  try {
    const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fromData), // ensure the correct data is sent
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Error updating profile:", result.error); // error handling
      throw new Error(result.error);
    }

    console.log("Profile updated successfully:", result); // debugging
    toast.success(result.message);

    // Optionally re-fetch updated data or trigger a re-render
  } catch (err) {
    console.error("Update profile error:", err); // error handling
    toast.error(err.message);
  }
};

  //resuable function for adding items
  const addItem = (key, item) => {

    setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item,] }))
  }

  // reusable input change function
  const handleResusableInputChangeFunc = (key, index, event) => {

    const { name, value } = event.target

    setFormData(prevFormData => {
      const updateItems = [...prevFormData[key]]

      updateItems[index][name] = value

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  //reusable functions  for deleting item pending 
  const deleteItem = (key, index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  // Qualification
  const addQualification = (e) => {
    e.preventDefault();

    addItem('qualifications', {
      startingDate: '',
      endingDate: '',
      degree: 'PHD',
      university: 'Uka Tarsadiya University ',
    });
  };


  const handleQualificationChange = (event, index) => {
    handleResusableInputChangeFunc('qualifications', index, event)
  }

  const deleteQualification = (e, index) => {
    e.preventDefault()
    deleteItem('qualifications', index)
  }

  // experiences section
  const addExperience = (e) => {
    e.preventDefault();

    addItem('experiences', {
      startingDate: '', endingDate: '', position: 'Senior Surgeon', hospital: 'Civil Hospital '
    });
  };


  const handleExperienceChange = (event, index) => {
    handleResusableInputChangeFunc('experiences', index, event)
  }

  const deleteExperience = (e, index) => {
    e.preventDefault()
    deleteItem('experiences', index)
  }

  // adding TimeSlot
  const addTimeSlot = (e) => {
    e.preventDefault();

    addItem('timeSlots', {
      day: 'Sunday', startingTime: '09:00', endingTime: '05:00'
    });
  };


  const handleTimeSlotChange = (event, index) => {
    handleResusableInputChangeFunc('timeSlots', index, event)
  }

  const deleteTimeSlot = (e, index) => {
    e.preventDefault()
    deleteItem('timeSlots', index)
  }

  return (
    <div>
      <h2 className='text-headingColor font-bold text-[24px] leading-9 mb-10'>
        Profile Information
      </h2>

      <form>
        <div className='mb-5'>
          <p className='form__label'>Name*</p>
          <input type='text' name='name' value={fromData.name} onChange={handleInputChange} placeholder='Full Name' className='form__input'></input>
        </div>

        <div className='mb-5'>
          <p className='form__label'>Email*</p>
          <input type='email' name='email' value={fromData.email} onChange={handleInputChange} placeholder='email' className='form__input' readOnly aria-readonly disabled={true} />
        </div>

        <div className='mb-5'>
          <p className='form__label'>Phone*</p>
          <input type='number' name='phone' value={fromData.phone} onChange={handleInputChange} placeholder='Phone Number' className='form__input' />
        </div>

        <div className='mb-5'>
          <p className='form__label'>Bio*</p>
          <input type='text' name='bio' value={fromData.bio} onChange={handleInputChange} placeholder='Bio' className='form__input' maxLength={100} />
        </div>

        <div className='mb-5'>
          <div className='grid grid-cols-3 gap-5 mb-[30px]'>
            <div>
              <p className='form__label'>Gender*</p>
              <select name='gender' value={fromData.gender} onChange={handleInputChange} className='form__input py-3.5'>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other </option>
              </select>

            </div>

            <div>
              <p className='form__label'>Specialization*</p>
              <select name='specialization' value={fromData.specialization} onChange={handleInputChange} className='form__input py-3.5'>
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>

            <div>
              <p className='form__label'>Ticket Price*</p>
              <input type='number' placeholder='100' name='ticketprice' value={fromData.ticketprice} className='form__input' onChange={handleInputChange} />
            </div>
          </div>
        </div>

        <div className='mb-5'>
          <p className='form__label'>Qualification</p>
          {fromData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className='grid grid-cols-2 gap-5'>
                  <div>
                    <p className='form__label'>Starting Date</p>
                    <input
                      type='date'
                      name='startingDate'
                      value={item.startingDate}
                      className='form__input'
                      onChange={e => handleQualificationChange(e, index)}
                    >
                    </input>
                  </div>

                  <div>
                    <p className='form__label'>Ending Date</p>
                    <input
                      type='date'
                      name='endingDate'
                      value={item.endingDate}
                      className='form__input'
                      onChange={e => handleQualificationChange(e, index)}
                    >
                    </input>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-5 mt-5'>
                  <div>
                    <p className='form__label'>Degree*</p>
                    <input
                      type='text'
                      name='degree'
                      value={item.degree}
                      className='form__input'
                      onChange={e => handleQualificationChange(e, index)}
                    >
                    </input>
                  </div>

                  <div>
                    <p className='form__label'>University*</p>
                    <input
                      type='text'
                      name='university'
                      value={item.university}
                      className='form__input'
                      onChange={e => handleQualificationChange(e, index)}
                    >
                    </input>
                  </div>
                </div>

                <button onClick={e => deleteQualification(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
              </div>
            </div>
          ))}

          <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
            Add Qualification
          </button>
        </div>
        <div className='mb-5'>
          <p className='form__label'>Experiences</p>
          {fromData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className='grid grid-cols-2 gap-5'>
                  <div>
                    <p className='form__label'>Starting Date</p>
                    <input
                      type='date'
                      name='startingDate'
                      value={item.startingDate}
                      className='form__input'
                      onChange={e => handleExperienceChange(e, index)}
                    >
                    </input>
                  </div>

                  <div>
                    <p className='form__label'>Ending Date</p>
                    <input
                      type='date'
                      name='endingDate'
                      value={item.endingDate}
                      className='form__input'
                      onChange={e => handleExperienceChange(e, index)}
                    >
                    </input>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-5 mt-5'>
                  <div>
                    <p className='form__label'>Position*</p>
                    <input
                      type='text'
                      name='position'
                      value={item.position}
                      className='form__input'
                      onChange={e => handleExperienceChange(e, index)}
                    >
                    </input>
                  </div>

                  <div>
                    <p className='form__label'>Hospital*</p>
                    <input
                      type='text'
                      name='hospital'
                      value={item.hospital}
                      className='form__input'
                      onChange={e => handleExperienceChange(e, index)}
                    >
                    </input>
                  </div>
                </div>

                <button onClick={e => deleteExperience(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
              </div>
            </div>
          ))}

          <button onClick={addExperience} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
            Add Experience
          </button>
        </div>

        <div className='mb-5'>
          <p className='form__label'>Time Slots*</p>
          {fromData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                  <div>
                    <p className='form__label'>Day*</p>
                    <select name='day' value={item.day} className='form__input py-3.5'
                      onChange={e => handleTimeSlotChange(e, index)}>

                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>

                  <div>
                    <p className='form__label'>Starting Time*</p>
                    <input
                      type='time'
                      name='startingTime'
                      value={item.startingTime}
                      className='form__input'
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className='form__label'>Ending Time*</p>
                    <input
                      type='time'
                      name='endingTime'
                      value={item.endingTime}
                      className='form__input'
                      onChange={e => handleTimeSlotChange(e, index)}
                    />
                  </div>

                  <div onClick={e => deleteTimeSlot(e, index)} className='flex items-center'>
                    <button className='bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6'><AiOutlineDelete /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={addTimeSlot} className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer'>
            Add Timeslot
          </button>
        </div>

        <div className='mb-5'>
          <p className='form__label'>About*</p>
          <textarea name='about' rows={5} value={fromData.about} placeholder='Write About You' onChange={handleInputChange} className='form__input'></textarea>
        </div>

        <div className='mb-5 flex items-center gap-3'>
          {fromData.photo && (
            <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
              <img src={fromData.photo} alt='' className='w-full rounded-full' />
            </figure>
          )}

          <div className='relative w-[130px] h-[50px]'>
            <input
              type='file'
              name='photo'
              id='customFile'
              onChange={handleFileInputChange}
              accept='.jpg, .png'
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
            />

            <label
              htmlFor='customFile'
              className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className='mt-7'>
          <button typr='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>
            Update Profile
          </button>

        </div>
      </form>
    </div>
  )
}

export default Profile