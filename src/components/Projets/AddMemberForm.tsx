import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, InputLabel, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { FaStarOfLife } from 'react-icons/fa6';
// import { groupRegister } from '../../apiRequest/Groups/groups';
import userContext from '../../utils/userContext';
// interface RegisterAgentFormProps {
//   fetchGroups: () => void;
//   onClose: (shouldFetch: boolean) => void;
//   onAdd: (shouldFetch: boolean) => void;
// }

interface FormValues {
  legal_entity_name: string;
  tax_id: string;
  doing_business_as: string;
  other_names: string;
  group_npi: string;
  status: boolean;
}

const AddMemberForm = (props: any) => {
  const { fetchGroups, onClose } = props;
  const { setOpenNotifier, setNotifyMessage, setHiderDurationNotifier } = useContext(userContext);
  const formik = useFormik<FormValues>({
    initialValues: {
      legal_entity_name: '',
      tax_id: '',
      doing_business_as: '',
      other_names: '',
      group_npi: '',
      status: true, // default value
    },
    
    validationSchema: Yup.object({
      legal_entity_name: Yup.string()
        .test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value[0] !== ' ') 
        .required('Legal Entity Name is required'),
      tax_id: Yup.string()
        .test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value[0] !== ' ') 
        .required('Tax ID is required'),
      doing_business_as: Yup.string().test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value[0] !== ' ').required('Required'), 
     
      group_npi: Yup.string()
        .test('no-leading-spaces', 'Leading spaces are not allowed', value => value && value[0] !== ' ') 
        .required('Group NPI is required')
        .matches(/^\d+$/, 'Group NPI must contain only numbers')
        .length(10, 'Group NPI must be exactly 10 digits'),
      status: Yup.boolean()
        .required('Status is required'),
    }),
    
    
    
    onSubmit: async (values) => {
      try {

      } catch (error: any) {
        console.log('There was an error submitting the form!', error);
        if (Array.isArray(error)) {
          error.forEach((err: {field: string, message: string}) => {
            formik.setFieldError(err.field, err.message);
          });
        } else {
          if (error.message) {
            console.log('Server error:', error.message);
          }
        }
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel
            shrink
            style={{ fontWeight: '600', marginBottom: '0.5em', fontSize: "20px" }}
          >
            <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginRight: '1em', marginBottom: "8px" }} />
            Legal Entity Name
          </InputLabel>
          <TextField
            fullWidth
            id="legal_entity_name"
            size="small"
            name="legal_entity_name"
            placeholder="Legal Entity Name"
            value={formik.values.legal_entity_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.legal_entity_name && Boolean(formik.errors.legal_entity_name)}
            helperText={formik.touched.legal_entity_name && formik.errors.legal_entity_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel
            shrink
            style={{ fontWeight: '600', marginBottom: '0.5em', fontSize: "20px" }}
          >
            <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginRight: '1em', marginBottom: "8px" }} />
            Tax ID
          </InputLabel>
          <TextField
            fullWidth
            id="tax_id"
            name="tax_id"
            size="small"
            placeholder="Tax ID"
            value={formik.values.tax_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tax_id && Boolean(formik.errors.tax_id)}
            helperText={formik.touched.tax_id && formik.errors.tax_id}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel
            shrink
            style={{ fontWeight: '600', marginBottom: '0.5em', fontSize: '20px' }}
          >
            <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginRight: '1em', marginBottom: "8px" }} />
            DBA
          </InputLabel>
          <TextField
            fullWidth
            id="doing_business_as"
            size="small"
            name="doing_business_as"
            placeholder="Doing Business As"
            value={formik.values.doing_business_as}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.doing_business_as && Boolean(formik.errors.doing_business_as)}
            helperText={formik.touched.doing_business_as && formik.errors.doing_business_as}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel
            shrink
            style={{ fontWeight: '600', marginBottom: '0.5em', fontSize: '20px' }}
          >
            Other Name
          </InputLabel>
          <TextField
            fullWidth
            id="other_names"
            name="other_names"
            size="small"
            placeholder="Other Name"
            value={formik.values.other_names}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.other_names && Boolean(formik.errors.other_names)}
            helperText={formik.touched.other_names && formik.errors.other_names}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel
            shrink
            style={{ fontWeight: '600', marginBottom: '0.5em', fontSize: "20px" }}
          >
            <FaStarOfLife style={{ color: 'red', fontSize: '10px', marginRight: '1em', marginBottom: "8px" }} />
            NPI#
          </InputLabel>
          <TextField
            fullWidth
            id="NPI"
            name="group_npi"
            size="small"
            label="NPI"
            value={formik.values.group_npi}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.group_npi && Boolean(formik.errors.group_npi)}
            helperText={formik.touched.group_npi && formik.errors.group_npi}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl size="small" component="fieldset" error={formik.touched.status && Boolean(formik.errors.status)}>
            <FormLabel component="legend" style={{ fontSize: "15px" }}>Status</FormLabel>
            <RadioGroup
              aria-label="status"
              name="status"
              value={formik.values.status ? 'active' : 'inactive'}
              onChange={(e) => formik.setFieldValue('status', e.target.value === 'active')}
            >
              <FormControlLabel value="active" control={<Radio />} label="Active" />
              <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
            </RadioGroup>
            {formik.touched.status && formik.errors.status && (
              <Box component="span" sx={{ color: 'error.main', fontSize: '0.75rem' }}>
                {formik.errors.status}
              </Box>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" type="submit">
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddMemberForm;
