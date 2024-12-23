import jwtUtils from '../utils/jwtUtils.js';

const authenticateJWT = (req, res, next) => {
  if (req.path.startsWith('/api/auth') || req.path.startsWith('/docs')) {
    return next();
  }

  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'No token found',
    });
  }

  try {
    const decoded = jwtUtils.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid or expired ',
    });
  }
};

export default authenticateJWT;
