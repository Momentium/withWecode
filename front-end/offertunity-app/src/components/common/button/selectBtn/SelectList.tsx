
interface Props {
  selectList: string[];
  fcList: React.FC[];
  popList: boolean;

}

const SelectListPrsnt:React.FC<Props> = ({ popList, selectList, fcList }) => {
  return (
    <>
      {fcList}
    </>
  );
}
export default SelectListPrsnt;