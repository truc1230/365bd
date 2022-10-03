/** @format */

import { Button, Stack, TextField } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { TypePerson } from '@types';
import { Dialog } from 'components';

interface PersonDialogProps {
  open: boolean;
  handleClose: Function;
  type: 'add' | 'update';
  values?: TypePerson;
  onSubmit: Function;
}
function PersonDialog(props: PersonDialogProps) {
  const { open, handleClose, type, onSubmit, values } = props;
  return (
    <PersonDialogStyles>
      <Dialog open={open} handleClose={handleClose} closeButton header={type === 'add' ? 'Add Person' : 'update Person'}>
        <Formik
          initialValues={values && Object.keys(values).length > 0 ? values : { fullName: '', email: '', phoneNumber: '' }}
          validationSchema={Yup.object().shape({
            fullName: Yup.string().required('Full name is required'),
            email: Yup.string().email('Must be a valid email').required('email is required'),
            phoneNumber: Yup.string().required('phone number is required'),
          })}
          onSubmit={(values) => {
            onSubmit(values);
            handleClose(false);
          }}>
          {({ handleBlur, handleChange, handleSubmit, values, touched, errors, setFieldValue, dirty }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Stack direction={'row'}>
                  <TextField fullWidth name='fullName' label='Full Name' value={values.fullName} error={Boolean(touched.fullName && errors.fullName)} helperText={touched.fullName && errors.fullName} onBlur={handleBlur} onChange={handleChange} />
                </Stack>
                <Stack direction={'row'}>
                  <TextField fullWidth label='Email' name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
                </Stack>
                <Stack direction={'row'}>
                  <TextField fullWidth label='Phone Number' name='phoneNumber' value={values.phoneNumber} onBlur={handleBlur} onChange={handleChange} error={Boolean(touched.phoneNumber && errors.phoneNumber)} helperText={touched.phoneNumber && errors.phoneNumber} />
                </Stack>
                <Stack alignItems='center' justifyContent='flex-end' direction='row' spacing={2}>
                  <Button
                    variant='outlined'
                    type='button'
                    onClick={() => {
                      handleClose(false);
                    }}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained'>
                    Save
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Dialog>
    </PersonDialogStyles>
  );
}

export const PersonDialogStyles = styled.div``;

export default PersonDialog;
