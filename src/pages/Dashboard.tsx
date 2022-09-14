import DashboardBuilder from "../components/DashboardBuilder"

export const Dashboard: React.FC<{}> = () => {
  return (
    <div className="bg-red-500">
      <div className="text-bold text-3xl">h1</div>
      <DashboardBuilder/>
    </div>
  )
}