import { useState, useEffect } from "react";

type TermsType = "private" | "service" | "identify" | "provision_of_third";

type TermsListType = {
  [key in TermsType]: boolean;
};

const useTerms = (defaultTermsAgree?: TermsListType) => {
  const [checkAll, setCheckAll] = useState(false);
  const [termsAgree, setTermsAgree] = useState<TermsListType>(
    defaultTermsAgree || {
      private: false,
      service: false,
      identify: false,
      provision_of_third: false,
    }
  );

  useEffect(() => {
    if (
      !Object.keys(termsAgree).some(
        (key) => termsAgree[key as TermsType] === false
      )
    ) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [termsAgree]);

  const onCheckAll = (isAllCheck: boolean) => {
    setCheckAll(isAllCheck);
    setTermsAgree({
      private: isAllCheck,
      service: isAllCheck,
      identify: isAllCheck,
      provision_of_third: isAllCheck,
    });
  };

  return { termsAgree, setTermsAgree, checkAll, onCheckAll };
};

export type { TermsListType, TermsType };
export default useTerms;
