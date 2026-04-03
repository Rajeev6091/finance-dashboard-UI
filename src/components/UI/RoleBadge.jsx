import { Shield, Eye } from 'lucide-react';
import { ROLES } from '../../constants';

/**
 * Visual badge indicating the current user role.
 */
export default function RoleBadge({ role }) {
  const isAdmin = role === 'admin';
  const config = ROLES[role];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.3,
        background: config.color + '18',
        color: config.color,
        border: `1px solid ${config.color}30`,
      }}
    >
      {isAdmin ? <Shield size={13} /> : <Eye size={13} />}
      {config.label}
    </div>
  );
}
