import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../actions";
import "./styles/Detail.css";

export default function Detalle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pId,] = useState(id);

  useEffect(() => {
    dispatch(getById(pId));
  }, [dispatch, pId]);

  const detail = useSelector((state) => state.pokeDetail);

  //console.log("tipos =", detail.types)

  // useSelector(state => {
  //     console.log("Estado del Detalle", state);
  // });

  // console.log("Dettale desde Detalle ID:", productoId);

  return (
    <div className="detail-content">
      <div className="detail-titulo">
        <h1>Pokemon Detail</h1>
        <h2>Nombre: {detail.name}</h2>
      </div>

      <div className="detail-block">
        <div className="detail-block-img">
          <img src={detail.img} alt="" width="400px" height="400px" />
        </div>
        <div className="detail-block-info">
          <div className="detail-block-tipo">
            <div className="detail-block-tipo-titulo">
            <h4> Tipo = </h4>
            {Array.isArray(detail.types) ? (
              detail.types.map((t) => <h4>{t.name}</h4>)
            ) : detail.types ? (
              <h4>{detail.types}</h4>
            ) : (
              <h4> Sin Tipo</h4>
            )}
            </div>
          </div>
          <div className="detail-block-habilidades">
            <div className="detail-block-contenido">
              <h4>defense = </h4>
              <p>{detail.defense}</p>
            </div>

            <div className="detail-block-contenido">
              <h4>attack = </h4>
              <p>{detail.attack}</p>
            </div>
            <div className="detail-block-contenido">
            <h4>life =</h4>
            <p>{detail.life}</p>
          </div>
          <div className="detail-block-contenido">
            <h4>speed = </h4>
            <p>{detail.speed}</p>
          </div>
          <div className="detail-block-contenido">
            <h4>height = </h4>
            <p>{detail.height}</p>
          </div>
          <div className="detail-block-contenido">
            <h4>weight = </h4>
            <p>{detail.weight}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
