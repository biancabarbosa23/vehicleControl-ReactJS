import React, { createRef } from 'react'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'

import { tableIcons } from '../../../utils/TableIcons'

const data = [
  {
    plate: 'BRA2E19',
    marca: 'Volkswagen',
    modelo: 'Fox 2014',
    cor: 'Cinza',
    name: 'Lucas de Moraes Souza',
  },
  {
    plate: 'RIO2A18',
    marca: 'Volkswagen',
    modelo: 'Corsa',
    cor: 'Preto',
    name: 'Bianca Alves Barbosa',
  },
  {
    plate: 'BRB5423',
    marca: 'Hyundai',
    modelo: 'HB20',
    cor: 'Branco',
    name: 'Guilherme Cossari',
  },
  {
    plate: 'NZN1E19',
    marca: 'Hyundai',
    modelo: 'Santa fé',
    cor: 'preta',
    name: 'Angelina Melare',
  },
]

export default function Veiculos() {
  const tableRef = createRef()

  const handleOpenModal = (dados) => {
    Swal.fire({
      title: `<strong>Informações Gerais</strong>`,
      html:
        `<div class='text-left'><br><strong>Proprietário: </strong> <br> <br>` +
        `<ul><li><strong>Nome</strong> : ${dados.nome} </li><br> ` +
        `<li><strong>CPF</strong> : ${dados.cpf} </li><br>` +
        `<li><strong>Curso</strong> : ${dados.curso} </li><br> ` +
        `<li><strong>Período</strong> : ${dados.periodo} </li><br>` +
        `<li><strong>Semestre</strong>: ${dados.semestre} </li></ul><br><br>`,
      confirmButtonText: 'Fechar',
    })
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="div-table">
        <MaterialTable
          tableRef={tableRef}
          columns={[
            {
              title: 'Placa',
              field: 'plate',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Marca',
              field: 'marca',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Modelo',
              field: 'modelo',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Cor',
              field: 'cor',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Proprietário',
              field: 'name',
              type: 'string',
              filtering: false,
            },
          ]}
          data={data}
          title="Listagem de Veículos"
          icons={tableIcons}
          options={{
            filtering: false,
          }}
          actions={[
            {
              icon: tableIcons.ListIcon,
              tooltip: 'Visualizar Dados',
              onClick: (event, rowData) => {
                handleOpenModal({
                  nome: 'Lucas de Moraes Souza',
                  cpf: '41222365782',
                  curso: 'Eventos',
                  periodo: 'noite',
                  semestre: '2 semestre',
                })
              },
            },
          ]}
          localization={{
            pagination: {
              labelDisplayedRows: '{from}-{to} de {count}',
              labelRowsSelect: 'linhas',
              firstTooltip: 'Primeira página',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Página seguinte',
              lastTooltip: 'Última página',
            },
            toolbar: {
              searchTooltip: 'Buscar',
              searchPlaceholder: 'Buscar Proprietário/Placa',
            },
            header: {
              actions: 'Ações',
            },
            body: {
              emptyDataSourceMessage: 'Nenhum acesso encontrado',
            },
          }}
        />
      </div>
    </div>
  )
}
