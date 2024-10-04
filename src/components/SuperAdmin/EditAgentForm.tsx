import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Button, InputLabel, MenuItem, Select, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { FaStarOfLife } from 'react-icons/fa6';
import countries from '../../configData/phoneExtension.json'; // Correct path to your JSON file

interface EditAgentFormProps {
    initialValues: {
        user_name: string;
        first_name: string;
        last_name: string;
        ph_no: string;
        phone_ext: string;
        e_mail: string;
        active: boolean;
    };
    onSubmit: (values: any, actions:any) => void;
    onCancel: () => void;
}

const validationSchema = Yup.object({
    user_name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
    first_name: Yup.string()
      .required('First Name is required')
      .test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value.trim() === value),
  
    last_name: Yup.string()
      .required('Last Name is required')
      .test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value.trim() === value),
  
    phone_ext: Yup.string()
      .required('Phone extension is required')
      .test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value.trim() === value),
      e_mail: Yup.string()
      .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Invalid email address'
      )
      .required('Required'),
    ph_no: Yup.string()
      .required('Phone Number is required')
      .test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value.trim() === value)
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

const EditAgentForm: React.FC<EditAgentFormProps> = ({ initialValues, onSubmit, onCancel }) => {
    // const formik = useFormik({
    //     initialValues,
    //     validationSchema,
    //     onSubmit,
    //     validateOnChange: true,
    //     validateOnBlur: true,
    // });

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, actions) => {
        onSubmit(values, actions);  // Pass actions to handle setting field errors
      },
      validateOnChange: true,
      validateOnBlur: true,
    });

    const selectedCountry = countries.find(country => country.dialCode === formik.values.phone_ext);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
          <InputLabel sx={{marginBottom:'8px'}}>
            <FaStarOfLife style={{ color: 'red', fontSize: '8px', marginBottom:'5px'}} /> User Name
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
            helperText={formik.touched.user_name ? formik.errors.user_name as string:''}
          />
        </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel sx={{marginBottom:'6px'}}><FaStarOfLife style={{ color: 'red', fontSize: '8px' ,marginBottom:'5px',marginRight:'5px'}} />First Name</InputLabel>
                    <TextField
                        fullWidth
                        size="small"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && typeof formik.errors.first_name === 'string' ? formik.errors.first_name : null} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel sx={{marginBottom:'6px'}}><FaStarOfLife style={{ color: 'red', fontSize: '8px' ,marginBottom:'5px',marginRight:'5px'}} />Last Name</InputLabel>
                    <TextField
                        fullWidth
                        size="small"
                        id="last_name"
                        name="last_name"
                        placeholder='Last Name'
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && typeof formik.errors.last_name === 'string' ? formik.errors.last_name : null} />
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
            helperText={formik.touched.e_mail ? formik.errors.e_mail as string:''}
          />
        </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel sx={{marginBottom:'6px'}}>
                        <FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px' ,marginRight:'5px'}} />
                        EXT ##
                    </InputLabel>
                    <FormControl fullWidth size="small" error={formik.touched.phone_ext && Boolean(formik.errors.phone_ext)}>
                        <Select
                            id="phone_ext"
                            name="phone_ext"
                            value={formik.values.phone_ext}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                            <div style={{ color: "#d32f2f", fontSize: '12px', marginTop: '5px', marginLeft: '10px', fontFamily: 'sans-serif' }}>
                                {typeof formik.errors.phone_ext === 'string' ? formik.errors.phone_ext : JSON.stringify(formik.errors.phone_ext)}
                            </div>
                        ) : null}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel sx={{marginBottom:'6px'}}><FaStarOfLife style={{ color: 'red', fontSize: '8px',marginBottom:'5px',marginRight:'5px' }} />Phone ##</InputLabel>
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

                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" type="submit">Update</Button>
                    {/* <Button variant="outlined" color="secondary" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</Button> */}
                </Grid>
            </Grid>
        </form>
    );
};

export default EditAgentForm;
