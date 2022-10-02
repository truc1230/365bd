import DashboardBuilder from "components/DashboardBuilder";
import styled from "styled-components";

export const Dashboard: React.FC<{}> = () => {
  return (
    <div className="bg-red-500">
      <div className="text-bold text-3xl">h1</div>
      <DashboardBuilder/>
      <DivAB className="bg-blue-500"/>
    </div>
  )
}
const DivAB = styled.div`
  /* ... */
  width:100%;
  height:100px;
  background-color:${props => props.theme.palette.primary.main};;
`;