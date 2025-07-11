// app/employee-register/page.tsx
'use client';

import { StoreProvider } from '@/context/StoreContext';
import EmployeeRegistrationForm from './Form';

export default function EmployeeRegistrationPage() {
  return (
    <StoreProvider>
      <EmployeeRegistrationForm />
    </StoreProvider>
  );
}