import { useMemo } from 'react';
import useApi from './useApi';
import ApiBroker from '../services/api-broker';

/**
 * Hook cung cấp API Broker để quản lý tập trung các API calls
 * @returns Instance của API Broker
 */
export const useApiBroker = () => {
  const { callApi } = useApi();
  
  // Sử dụng useMemo để tránh tạo lại instance mỗi lần component re-render
  const apiBroker = useMemo(() => new ApiBroker(callApi), [callApi]);
  
  return apiBroker;
};

export default useApiBroker;
