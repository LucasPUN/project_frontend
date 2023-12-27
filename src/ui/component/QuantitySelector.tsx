

type Props = {
    quantity: number,
    handleMinus: () => void,
    handlePlus: () => void
}

export default function QuantitySelector({quantity,handleMinus,handlePlus}: Props) {
    return (
        <>
            <div className="d-flex ">
            <button className="btn btn-outline-info"
                style={{
                width:"40px",
                height:"40px"
            }}
                    onClick={handleMinus}
            >
                -
            </button>

            <div className="d-flex justify-content-center align-items-center"
                style={{
                width: "40px",
                height: "40px",
                border: "1px solid black",
                backgroundColor:"whitesmoke"
            }}>
                {quantity}
            </div>

            <button className="btn btn-outline-info"
                style={{
                width: "40px",
                height: "40px"
            }}
                    onClick={handlePlus}
            >
                +
            </button>
            </div>
        </>
    )
}