import { Role, useAuth } from '../../myapp4/context/AuthContext';

const WithRole = ({ children, role }: { children: any; role: Role }) => {
  const { authState } = useAuth();

  if (authState?.role !== role) {
    return <></>;
  }

  return <>{children}</>;
};

export default WithRole;
