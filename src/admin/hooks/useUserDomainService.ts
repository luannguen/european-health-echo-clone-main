import { useState, useMemo } from 'react';
import { useApiBroker } from './useApiBroker';
import { UserDomainService, UserDomainServiceImpl } from '../services/domain/user-domain-service';

/**
 * Hook để sử dụng UserDomainService trong các components và controllers
 * @returns UserDomainService instance
 */
export const useUserDomainService = (): UserDomainService => {
  const apiBroker = useApiBroker();
  
  // Sử dụng useMemo để tránh tạo lại instance mỗi lần component re-render
  const userDomainService = useMemo(
    () => new UserDomainServiceImpl(apiBroker),
    [apiBroker]
  );
  
  return userDomainService;
};

export default useUserDomainService;
