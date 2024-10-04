import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, InputLabel, MenuItem, Select, FormControl, RadioGroup, FormControlLabel, Radio, FormHelperText, InputAdornment, IconButton } from '@mui/material';
import { adminRegister } from '../../apiRequest/Admin/admin';
import { FaEye, FaEyeSlash, FaStarOfLife } from 'react-icons/fa6';
import countries from '../../configData/phoneExtension.json'; // Correct path to your JSON file
import AdminContext from '../../utils/adminContext';

interface FormValues {
  user_name: string;
  first_name: string;
  last_name: string;
  e_mail: string;
  ph_no: string;
  phone_ext: string;
  password: string;
  confirm_password: string;
  active: boolean;
}

const formatPhoneNumber = (value: string, phone_ext: string) => {
  if (!value) return '';

  const phoneNumber = value.replace(/[^\d]/g, '');

  switch (phone_ext) {
    case '+1': // US, Canada
      return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
    case '+44': // UK
      return phoneNumber.replace(/^(\d{4})(\d{3})(\d{4})$/, '$1 $2 $3');
    case '+49': // Germany
      return phoneNumber.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3');
    case '+33': // France
      return phoneNumber.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
    case '+91': // India
      return phoneNumber.replace(/^(\d{5})(\d{5})$/, '$1 $2');
    case '+61': // Australia
      return phoneNumber.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3');
    case '+81': // Japan
      return phoneNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1-$2-$3');
    case '+55': // Brazil
      return phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    case '+27': // South Africa
      return phoneNumber.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
    default:
      return phoneNumber;
  }
};

const RegistrationForm = (props) => {
  const { fetchUsers, onClose, page, rowsPerPage, searchQuery } = props;
  const { setOpenNotifier, setNotifyMessage, setHiderDurationNotifier } = useContext(AdminContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      user_name: '',
      first_name: '',
      last_name: '',
      password: '',
      ph_no: '',
      phone_ext: "",
      e_mail: '',
      confirm_password: '',
      active: true, // Added 'active' field as boolean
    },



    validationSchema: Yup.object({
      user_name: Yup.string()
        .matches(
          /^[^\s]*$/, // Disallow any spaces
          'Username must not contain any spaces.'
        )
        .min(6, 'Must be more than 6 characters')
        .required('Username is required'),

      first_name: Yup.string()
        .matches(
          /^(?!\s)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
          'First name must not start or end with a space, and must contain single spaces between words.'
        )
        .matches(
          /^(?!.*([a-zA-Z])\1{2})(?!.*[^a-zA-Z\s]).*$/,
          'First name should not contain special characters or have more than two identical characters consecutively.'
        )
        .max(15, 'Must be 15 characters or less')
        .required('First name is required'),

      last_name: Yup.string()
        .matches(
          /^(?!\s)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
          'Last name must not start or end with a space, and must contain single spaces between words.'
        )
        .matches(
          /^(?!.*([a-zA-Z])\1{2})(?!.*[^a-zA-Z\s]).*$/,
          'Last name should not contain special characters or have more than two identical characters consecutively.'
        )
        .max(20, 'Must be 20 characters or less')
        .required('Last name is required'),


      e_mail: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Invalid email format'
        )
        .required('Email is required'),
      phone_ext: Yup.string()
        .required('Phone extension is required'),
      ph_no: Yup.string()
        .required('Phone Number is required')
        .test('isValidPhoneNumber', 'Invalid phone number format', function (value) {
          const { phone_ext } = this.parent;
          const phoneNumber = value?.replace(/\D/g, ''); // Remove non-numeric characters

          switch (phone_ext) {
            case '+1': // US/Canada
              return phoneNumber.length === 10;
            case '+44': // UK
              return phoneNumber.length >= 10 && phoneNumber.length <= 12;
            case '+49': // Germany
              return phoneNumber.length >= 5 && phoneNumber.length <= 15;
            case '+33': // France
              return phoneNumber.length === 9 || phoneNumber.length === 10;
            case '+91': // India
              return phoneNumber.length === 10;
            case '+61': // Australia
              return phoneNumber.length === 9;
            case '+81': // Japan
              return phoneNumber.length >= 10 && phoneNumber.length <= 11;
            case '+55': // Brazil
              return phoneNumber.length === 11;
            case '+27': // South Africa
              return phoneNumber.length === 9;
            default:
              return true; // Default to valid if no specific validation
          }
        }),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(16, 'Password must be at most 16 characters long')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
        .required('Password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),



    onSubmit: async (values) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirm_password, ...dataToSend } = values;

      try {
        const response = await adminRegister(dataToSend);
        if (response?.message) {

          // if(response.message.includes('User with the provided email already exists'))
          //   {
          //     formik.setFieldError('user_name','User with the provided username already exists');
          //   }
          // if(response.message.includes('User with the provided email already exists'))
          // {
          //   formik.setFieldError('e_mail', 'User with the provided email already exists');   
          // }

          // if(response.message.includes('User with the provided phone number already exists'))
          // {
          //   formik.setFieldError('ph_no', 'User with the provided username already exists');
          // }
          if (response.message.includes('Admin created successfully')) {
            fetchUsers(page, rowsPerPage, searchQuery);
            onClose();
            setOpenNotifier(true);
            setNotifyMessage('Admin created successfully');
            setHiderDurationNotifier(3000);
          }


        }
      } catch (error: any) {
        // Handle validation errors if the error is an array
        if (Array.isArray(error)) {
          error.forEach((err: { field: string, message: string }) => {
            formik.setFieldError(err.field, err.message);
          });
        } else {
          // Handle other error messages (generic errors)
          if (error.message) {
            console.log('Server error:', error.message);
          }
        }
      }
    },

  });
  const selectedCountry = countries.find(country => country.dialCode === formik.values.phone_ext);


  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  return (
    <Box>
      <Grid container>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '30em' }}
        >
          <Grid container spacing={2}>
            {/* Form Fields */}
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="user_name" sx={{ fontSize: '20px' }}>
                <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginBottom: '5px' }} /> Username
              </InputLabel>
              <TextField
                fullWidth
                id="user_name"
                size="small"

                name="user_name"
                placeholder='Username'
                value={formik.values.user_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                helperText={formik.touched.user_name && formik.errors.user_name}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="first_name" sx={{ fontSize: '20px' }}>
                <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginBottom: '5px' }} /> First Name
              </InputLabel>
              <TextField
                fullWidth
                id="first_name"
                name="first_name"
                size="small"

                placeholder='First Name'
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="last_name" sx={{ fontSize: '20px' }}>
                <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginBottom: '5px' }} /> Last Name
              </InputLabel>
              <TextField
                fullWidth
                id="last_name"
                name="last_name"
                size="small"

                placeholder='Last name'
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="e_mail" sx={{ fontSize: '20px' }}>
                <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginBottom: '5px' }} /> Email
              </InputLabel>
              <TextField
                fullWidth
                id="e_mail"
                name="e_mail"
                size="small"

                type="email"
                placeholder='Email'
                value={formik.values.e_mail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.e_mail && Boolean(formik.errors.e_mail)}
                helperText={formik.touched.e_mail && formik.errors.e_mail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: '8px' }}>
                <FaStarOfLife style={{ color: 'red', fontSize: '7px', marginBottom: '5px', marginRight: '3px' }} />Ext ##
              </InputLabel>
              <FormControl fullWidth size="small">
                <Select
                  id="phone_ext"
                  name="phone_ext"
                  value={formik.values.phone_ext}
                  onChange={formik.handleChange}
                  displayEmpty
                  renderValue={(value) =>
                    value ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={selectedCountry?.flag} alt="" style={{ width: 24, marginRight: 8 }} />
                        {selectedCountry?.dialCode}
                      </div>
                    ) : (
                      <div style={{ color: '#aaa' }}>Select Phone Extension</div>
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    <p>Select Phone Extension</p>
                  </MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.dialCode}>
                      <img src={country.flag} alt="" style={{ width: 24, marginRight: 8 }} />
                      {country.name} ({country.dialCode})
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.phone_ext && formik.errors.phone_ext ? (
                  <div style={{ color: "#d32f2f", fontSize: '12px', marginTop: '5px', marginLeft: '10px', fontFamily: 'sans-serif' }}>{formik.errors.phone_ext}</div>
                ) : null}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ marginBottom: '8px' }}><FaStarOfLife style={{ color: 'red', fontSize: '7px', marginBottom: '5px', marginRight: '3px' }} />Phone ##</InputLabel>
              <TextField
                fullWidth
                size="small"
                id="ph_no"
                name="ph_no"
                placeholder='Phone Number'
                value={formatPhoneNumber(formik.values.ph_no, formik.values.phone_ext)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^\d]/g, '');
                  formik.setFieldValue('ph_no', rawValue); // Save raw value for validation
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.ph_no && Boolean(formik.errors.ph_no)}
                helperText={formik.touched.ph_no && typeof formik.errors.ph_no === 'string' ? formik.errors.ph_no : null} />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="password" sx={{ fontSize: '20px' }}>
                <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginBottom: '5px' }} /> Password
              </InputLabel>
              <TextField
                fullWidth
                id="password"
                name="password"
                size="small"
                type={showPassword ? 'text' : 'password'} // Toggles between text and password
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <FaEye style={{ fontSize: '18px' }} />
                        ) : (
                          <FaEyeSlash style={{ fontSize: '18px' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel shrink htmlFor="confirm_password" sx={{ fontSize: '20px' }}>
                <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginBottom: '5px' }} /> Confirm Password
              </InputLabel>
              <TextField
                fullWidth
                id="confirm_password"
                name="confirm_password"
                size="small"
                type={showConfirmPassword ? 'text' : 'password'} // Toggles between text and password
                placeholder="Confirm password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <FaEye style={{ fontSize: '18px' }} />
                        ) : (
                          <FaEyeSlash style={{ fontSize: '18px' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel shrink sx={{ fontSize: '20px' }}>
                Status
              </InputLabel>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  id="active"
                  name="active"
                  value={formik.values.active ? 'true' : 'false'}
                  onChange={(event) => formik.setFieldValue('active', event.target.value === 'true')}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
                {/* {formik.touched.active && Boolean(formik.errors.active) && (
                  <FormHelperText error>{formik.errors.active}</FormHelperText>
                )} */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ width: '10em', height: '3em' }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default RegistrationForm;
