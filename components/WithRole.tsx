import { useAuth, Role } from '../context/AuthContext';

const WithRole = ({ children, role }: { children: any; role: Role }) => {
  const { authState } = useAuth();

  if (authState?.role !== role) {
    return <></>;
  }

  return <>{children}</>;
};

export default WithRole;
