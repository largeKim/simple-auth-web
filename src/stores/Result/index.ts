import { selector } from 'recoil';
import { fetcher } from '@app';

interface TaxOfficeType {
  name: string;
  phone: string;
}

type TaxOfficeResponseType = {
  tax: {
    office: TaxOfficeType;
  };
};

type IncomeTypeName = 'prepaid' | 'refund';

type IncomeType = {
  amount: number;
  type: IncomeTypeName;
};

type IncomeReponseType = {
  tax: {
    incomes: IncomeType[];
  };
};

const IncomeListKr: { [key in IncomeTypeName]: string } = {
  prepaid: 'PrePaid Tax',
  refund: 'Refund',
};

const taxIncomeState = selector<IncomeType[]>({
  key: 'TaxIncomeState',
  get: async () => {
    const { data } = await fetcher<never, IncomeReponseType>({
      url: 'tax/incomes',
    });
    const { incomes } = data.tax;

    return incomes;
  },
});

const taxOfficeState = selector<TaxOfficeType>({
  key: 'TaxOfficeState',
  get: async () => {
    const { data } = await fetcher<never, TaxOfficeResponseType>({
      url: 'tax/office',
    });
    const { office } = data.tax;

    return office;
  },
});

export type { TaxOfficeResponseType, IncomeType, IncomeReponseType };
export { IncomeListKr, taxIncomeState, taxOfficeState };
