import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, InputLabel, FormControl, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { agentRegister } from '../../apiRequest/agent/agents';
import { FaStarOfLife } from 'react-icons/fa6';
import countries from '../../configData/phoneExtension.json'; // Correct path to your JSON file
import AdminContext from '../../utils/adminContext';

interface RegisterAgentFormProps {
  fetchAgents: (page: number, limit: number) => void;
  onClose: (shouldFetch?: boolean) => void;
  page: number;
  rowsPerPage: number;
}

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

const validationSchema = Yup.object({
  user_name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required')
    ,
  first_name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required')
    .matches(/^[A-Za-z]+$/, 'First Name should contain only alphabets'),
  last_name: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required')
    .matches(/^[A-Za-z]+$/, 'First Name should contain only alphabets'),
  // e_mail: Yup.string()
  //   .email('Invalid email address')
  //   .required('Required'),
  e_mail: Yup.string()
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email address'
    )
    .required('Required'),
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
    .min(8, 'Must be at least 8 characters')
    .max(16, 'Must be 16 characters or less')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Must contain at least one special character')
    .required('Required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

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

const RegisterAgentForm: React.FC<RegisterAgentFormProps> = (props) => {
  const { fetchAgents, onClose, page, rowsPerPage } = props;
  const {setOpenNotifier, setNotifyMessage, setHiderDurationNotifier} = useContext(AdminContext);

  const formik = useFormik<FormValues>({
    initialValues: {
      user_name: '',
      first_name: '',
      last_name: '',
      password: '',
      ph_no: '',
      phone_ext: '',
      e_mail: '',
      confirm_password: '',
      active:true
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const { confirm_password, ...dataToSend } = values;

      try {
        const response = await agentRegister(dataToSend);

        if (response?.message) {
          // if (response.message.includes('User with the provided email already exists')) {
          //   setErrors({ e_mail: 'User with the provided email already exists' });
          // } 
          if (response.message.includes("Agent created successfully")) {
            fetchAgents(page, rowsPerPage);
            onClose();
            setOpenNotifier(true);
            setNotifyMessage('Agent has been created');
            setHiderDurationNotifier(3000);
          }
        }
      } catch (error:any) {
        // if (error.message.includes('User with the provided email already exists')) {
        //     setErrors({ e_mail: 'User with the provided email already exists' });
        //   } 
        // console.log('There was an error submitting the form!', error);
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
      } finally {
        setSubmitting(false);
      }
    },
  });

  const selectedCountry = countries.find(country => country.dialCode === formik.values.phone_ext);


  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%', maxWidth: 600 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px', marginBottom:'5px'}} /> Username
          </InputLabel>
          <TextField
            fullWidth
            id="user_name"
            name="user_name"
            size="small"

            placeholder="Username"
            value={formik.values.user_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.user_name && Boolean(formik.errors.user_name)}
            helperText={formik.touched.user_name && formik.errors.user_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px', marginBottom:'5px' }} /> First Name
          </InputLabel>
          <TextField
            fullWidth
            id="first_name"
            name="first_name"
            size="small"

            placeholder="First name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px' }} /> Last Name
          </InputLabel>
          <TextField
            fullWidth
            id="last_name"
            name="last_name"
            size="small"

            placeholder="Last name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px' }} /> Email
          </InputLabel>
          <TextField
            fullWidth
            id="e_mail"
            name="e_mail"
            placeholder="Email"
            type="email"
            size="small"

            value={formik.values.e_mail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.e_mail && Boolean(formik.errors.e_mail)}
            helperText={formik.touched.e_mail && formik.errors.e_mail}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px' ,marginRight:'3px'}} />Ext ##
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
      <div style={{ color: "#d32f2f", fontSize: '12px', marginTop: '5px',marginLeft:'10px', fontFamily:'sans-serif' }}>{formik.errors.phone_ext}</div>
    ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}><FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px',marginRight:'3px' }} />Phone ##</InputLabel>
          <TextField
            fullWidth
            size="small"
            id="ph_no"
            name="ph_no"
            placeholder="Phone Number"
            value={formatPhoneNumber(formik.values.ph_no, formik.values.phone_ext)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^\d]/g, '');
              formik.setFieldValue('ph_no', rawValue); // Save raw value for validation
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.ph_no && Boolean(formik.errors.ph_no)}
            helperText={formik.touched.ph_no && typeof formik.errors.ph_no === 'string' ? formik.errors.ph_no : null} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px' }} /> Password
          </InputLabel>
          <TextField
            fullWidth
            id="password"
            name="password"
            placeholder="Password"
            size="small"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px' }} /> Confirm Password
          </InputLabel>
          <TextField
            fullWidth
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm Password"
            type="password"
            size="small"

            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
            helperText={formik.touched.confirm_password && formik.errors.confirm_password}
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
      </Grid>
      <Box mt={2}>
        <Button color="primary" variant="contained" type="submit">
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterAgentForm;
