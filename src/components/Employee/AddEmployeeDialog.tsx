// import React from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { useFormik } from 'formik';
// import { employeeSchema } from './validationSchema';

// interface EmployeeDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (values: { employeeName: string; status: string }) => Promise<void>;
// }

// const EmployeeDialog: React.FC<EmployeeDialogProps> = ({ open, onClose, onSubmit }) => {
//   const formik = useFormik({
//     initialValues: {
//       employeeName: '',
//       status: '',
//     },
//     validationSchema: employeeSchema,
//     onSubmit: async (values) => {
//       await onSubmit(values);
//       onClose();
//     },
//   });

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add Employee</DialogTitle>
//       <DialogContent>
//         <form onSubmit={formik.handleSubmit}>
//           <TextField
//             label="Employee Name"
//             fullWidth
//             margin="dense"
//             id="employeeName"
//             name="employeeName"
//             value={formik.values.employeeName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.employeeName && Boolean(formik.errors.employeeName)}
//             helperText={formik.touched.employeeName && formik.errors.employeeName}
//           />
//           <TextField
//             label="Status"
//             fullWidth
//             margin="dense"
//             id="status"
//             name="status"
//             value={formik.values.status}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.status && Boolean(formik.errors.status)}
//             helperText={formik.touched.status && formik.errors.status}
//           />
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={formik.handleSubmit} color="primary">
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EmployeeDialog;
