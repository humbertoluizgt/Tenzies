import React from "react";
import './Rank.css'
import { nanoid } from 'nanoid'

export default function Rank() {

  function TableRows() {
    return JSON.parse(localStorage.getItem("ranking"))
    .sort((a, b) => b.score - a.score)
    .map( row => {
      return (
        <React.Fragment key={nanoid()}>
          <tr className="rank--table-row">
            <td>{row.player}</td>
            <td>{row.time}s</td>
            <td>{row.rolls}</td>
            <td>{row.score}</td>
          </tr>
        </React.Fragment>
      )
    })  
  }

  return (
    <section className="rank--table-container">
      <table className="rank--table">
        <thead className="rank--table-head">
          <tr className="rank--table-tr-head">
            <th>Player</th>
            <th>Time</th>
            <th>Rolls</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>   
      </table>
    </section>
  )
}