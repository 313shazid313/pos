import { useGetAllSellsQuery } from "../../../../redux/additionals-state/sellApi"

const SellTable = () => {

  const { data: sellData } = useGetAllSellsQuery()
  console.log(sellData)
  

  return (
    <div>
      
    </div>
  )
}

export default SellTable
