export interface PrevOut {
  spent: boolean;
  tx_index: number;
  type: number;
  addr: string;
  value: number;
  n: number;
  script: string;
}

export interface Input {
  sequence: number;
  prev_out: PrevOut;
  script: string;
}

export interface Out {
  spent: boolean;
  tx_index: number;
  type: number;
  addr: string;
  value: number;
  n: number;
  script: string;
}

export interface X {
  lock_time: number;
  ver: number;
  size: number;
  inputs: Input[];
  time: number;
  tx_index: number;
  vin_sz: number;
  hash: string;
  vout_sz: number;
  relayed_by: string;
  out: Out[];
}

export interface IWebSocketResponse {
  op: string;
  x: X;
}

export interface IStateResponse {
  webSocketResponse: IWebSocketResponse[];
  trnsactions: Input[];
  showDetails: boolean;
  transactionDetails?: any;
}
