import React, { createRef } from 'react'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'

import { tableIcons } from '../../../utils/TableIcons'

const data = [
  {
    name: 'Lucas de Moraes Souza',
    plate: 'BRA2E19',
    input: '2021-05-25 12:55:03',
    output: '2021-05-25 13:32:22',
    image:
      'http://res.cloudinary.com/tgcontrole/image/upload/v1621994103/jnr2iqm40wlvsgb84bwq.jpg',
  },
  {
    name: 'Bianca Alves Barbosa',
    plate: 'RIO2A18',
    input: '2021-05-25 13:32:03',
    output: '2021-05-25 14:32:22',
    image:
      'http://res.cloudinary.com/tgcontrole/image/upload/v1621994103/jnr2iqm40wlvsgb84bwq.jpg',
  },
  {
    name: 'Guilherme Cossari',
    plate: 'BRB5423',
    input: '2021-05-25 13:55:03',
    output: '2021-05-25 15:32:22',
    image:
      'http://res.cloudinary.com/tgcontrole/image/upload/v1621994103/jnr2iqm40wlvsgb84bwq.jpg',
  },
  {
    name: 'Angelina Melare',
    plate: 'NZN1E19',
    input: '2021-05-25 14:05:03',
    output: '2021-05-25 22:32:22',
    image:
      'http://res.cloudinary.com/tgcontrole/image/upload/v1621994103/jnr2iqm40wlvsgb84bwq.jpg',
  },
  {
    name: 'André Souza',
    plate: 'BOR2A19',
    input: '2021-05-25 18:55:03',
    output: '2021-05-25 22:22:22',
    image:
      'http://res.cloudinary.com/tgcontrole/image/upload/v1621994103/jnr2iqm40wlvsgb84bwq.jpg',
  },
]

export default function Control() {
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
        `<li><strong>Semestre</strong>: ${dados.semestre} </li></ul><br><br>` +
        `<strong>veiculo:</strong> <br> <br>` +
        `<ul><li><strong>Placa</strong> : BRA2E19 </li><br> ` +
        `<li><strong>marca</strong> : Volkswagen </li><br> ` +
        `<li><strong>modelo</strong> : Fox 2014</li> <br> ` +
        `<li><strong>cor</strong> : cinza <br> </li></ul></div>`,
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
              title: 'Proprietário',
              field: 'name',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Placa',
              field: 'plate',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Entrada',
              field: 'input',
              type: 'datetime',
            },
            {
              title: 'Saida',
              field: 'output',
              type: 'datetime',
            },
            {
              title: '',
              align: 'right',
              render: (rowData) => (
                <a href={rowData.image} target="_blank">
                  Visualizar Imagem
                </a>
              ),
            },
          ]}
          data={data}
          title="Listagem de controle"
          icons={tableIcons}
          options={{
            filtering: true,
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
