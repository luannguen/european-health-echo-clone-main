import { useState, useMemo } from 'react';
import { useApiBroker } from './useApiBroker';
import { RoleDomainService, RoleDomainServiceImpl } from '../services/domain/role-domain-service';

/**
 * Hook để sử dụng RoleDomainService trong các components và controllers
 * @returns RoleDomainService instance
 */
export const useRoleDomainService = (): RoleDomainService => {
  const apiBroker = useApiBroker();
  
  // Sử dụng useMemo để tránh tạo lại instance mỗi lần component re-render
  const roleDomainService = useMemo(
    () => new RoleDomainServiceImpl(apiBroker),
    [apiBroker]
  );
  
  return roleDomainService;
};

export default useRoleDomainService;
