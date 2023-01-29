import React from 'react';
import { useForm } from 'react-hook-form';
import './EditModal.css';

const EditModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    return (
        <form onSubmit={handleSubmit()}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="form-control   my-5">    
          <div className="form-control">
          </div>
          <label className="label">
            <span className="label-text text-xs font-semibold">Name</span>
          </label>
          <input
            {...register("name", { required: "Enter user name" })}
            placeholder="Name"
            type="text"
            className="w-full my-2 pb-1"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
          <label className="label">
            <span className="label-text text-xs font-semibold">Email</span>
          </label>
          <input
            {...register("email", {
              required: "Enter your email",
            })}
            placeholder="Email"
            type="text"
            className="w-full my-2 pb-1"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          
          <label className="label">
            <span className="label-text text-xs font-semibold">User image</span>
          </label>
          <input
            {...register("userImage", { required: "Enter user image" })}
            type="file"
            className="w-full my-2 pb-1"
          />
          {errors.userImage && (
            <span className="text-red-500">{errors.userImage.message}</span>
          )}
  
          </div>
          <div className="modal-action flex">
              <label
                  htmlFor="my-modal-3"
                  className="rounded-full text-xs font-semibold px-3 py-2 ml-5"
                >
                  Cancel
                </label>
                <label
                  htmlFor="my-modal-3"
                  className="all-btn rounded-full text-xs text-white font-semibold px-3 py-2 ml-5"
                >
                  Save
                </label>
              </div>
      </form>
    );
};

export default EditModal;