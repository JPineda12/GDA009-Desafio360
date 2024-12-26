const API_URL = import.meta.env.VITE_API_BACKEND_URL;

export interface ApiError {
  status: number;
  message: string;
  data?: any;
}

const httpClient = async (endpoint: string, options: RequestInit): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    //Public routes array (the one's that dont require jwt token)
    const publicRoutes = ['/login'];

    const isPublicRoute = publicRoutes.some((route) => endpoint.startsWith(route));

    //Setting token in case the endpoint is not a public route.
    const headers: HeadersInit = isPublicRoute
    ? { ...options.headers }
    : { ...options.headers, Authorization: `Bearer ${token}` };


    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    const result = await response.json();

    if (result.status === 'success' && response.ok) {
      return result.data;
    }
    if (result.status === 'error') {
      const error = new Error(result.message || 'Request failed');
      (error as any).details = result.details || null;
      (error as any).statusCode = result.statusCode || response.status;
      throw error;
    }
    throw new Error('Unexpected response format');
  } catch (error: any) {
    console.error('HTTP Error:', error);
    throw error;
  }

};

export default httpClient;
