import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Input } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import React from 'react';

export function Form() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Xử lý dữ liệu khi người dùng nhấn nút đăng ký
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            className="materialUIInput"
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
        )}
        name="firstName"
        control={control}
        defaultValue=""
      />
      {errors.firstName?.type === 'required' && (
        <p role="alert">First name is required</p>
      )}
      <label>Last Name</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="lastName"
        control={control}
        defaultValue=""
      />
      <label htmlFor="birthdate">Birth of Date</label>
      <Controller
        name="birthOfDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            dateFormat="dd/MM/yyyy" // Format ngày theo mong muốn
            placeholderText="Select a date"
          />
        )}
      />
      {errors.birthOfDate && <p>{errors.birthOfDate.message}</p>}
      <label>Phone</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="phone"
        control={control}
        defaultValue=""
      />

      <label>Description</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="description"
        control={control}
        defaultValue=""
      />

      <label>School</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="school"
        control={control}
        defaultValue=""
      />

      <label>Hobbies</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="hobbies"
        control={control}
        defaultValue=""
      />

      <input type="submit" />
    </form>
  );
}
