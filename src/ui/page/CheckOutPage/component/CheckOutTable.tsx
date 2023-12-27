import {Table} from "react-bootstrap";
import CheckOutTableItem from "./CheckOutTableItem.tsx";
import {TransactionDtoItem} from "../../../../data/TransactionDto.ts";

type Props = {
    itemList: TransactionDtoItem[]
}

export default function CheckOutTable({itemList}: Props) {
    return (
        <>
            <Table className="align-middle">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                {
                    itemList.map((item) => (
                        <CheckOutTableItem item={item} key={item.tpid}/>
                    ))
                }
                </tbody>
            </Table>
        </>
    )
}