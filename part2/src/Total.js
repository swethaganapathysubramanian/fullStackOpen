import React from 'react'


const Total = ({ parts }) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <p><strong>
            total of {total} exercises </strong></p>
    )

}

export default Total;