import Image from "next/image";

const Spinner = () => {
  return <Image alt="spinner" width={200} height={200} src="/loading.svg" />;
};

export default Spinner;
