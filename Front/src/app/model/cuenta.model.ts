export interface Cuenta {
  id: number;
  Saldo_C: number;
}

export interface CreateCuentaDTO extends Omit<Cuenta, 'id'>{}

export interface UpdateCuentaDTO extends Partial<Cuenta>{}
