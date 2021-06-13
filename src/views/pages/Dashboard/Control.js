import React, { createRef } from 'react'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'

import { tableIcons } from '../../../utils/TableIcons'
import api from '../../../services/api'

export default function Control() {
  const tableRef = createRef()

  const handleOpenModal = (dados) => {
    let prop =
      dados.proprietario == 'aluno'
        ? `<div class='text-left'><br><strong>Proprietário: </strong> <br> <br>` +
          `<ul><li><strong>Nome</strong> : ${dados.nome} </li><br> ` +
          `<li><strong>CPF</strong> : ${dados.cpf} </li><br>` +
          `<li><strong>Curso</strong> : ${dados.curso} </li><br> ` +
          `<li><strong>Período</strong> : ${dados.periodo} </li><br>` +
          `<li><strong>Semestre</strong>: ${dados.semestre} </li></ul><br><br>`
        : `<div class='text-left'><br><strong>Proprietário: </strong> <br> <br>` +
          `<ul><li><strong>Nome</strong> : ${dados.nome} </li><br> ` +
          `<li><strong>CPF</strong> : ${dados.cpf} </li><br>` +
          `<li><strong>Função</strong> : ${dados.funcao} </li><br> `

    Swal.fire({
      title: `<strong>Informações Gerais</strong>`,
      html:
        prop +
        `<strong>veiculo:</strong> <br> <br>` +
        `<ul><li><strong>Placa</strong> : ${dados.placa} </li><br> ` +
        `<li><strong>marca</strong> : ${dados.marca} </li><br> ` +
        `<li><strong>modelo</strong> : ${dados.modelo}</li> <br> ` +
        `<li><strong>cor</strong> : ${dados.cor} <br> </li></ul></div>`,
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
              field: 'nome',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Placa',
              field: 'placa',
              type: 'string',
              filtering: false,
            },
            {
              title: 'Entrada',
              field: 'entrada',
              type: 'datetime',
            },
            {
              title: 'Saida',
              field: 'saida',
              type: 'datetime',
            },
            {
              title: '',
              align: 'right',
              render: (rowData) => (
                <a href={rowData.imagem} target="_blank">
                  Visualizar Imagem
                </a>
              ),
            },
          ]}
          data={(query) =>
            new Promise((resolve, reject) => {
              console.log(query)
              let field = ''
              let filterField = ''
              let filters = ''
              if (query.orderBy !== undefined) field = query.orderBy.field
              if (query.filters.length > 0) {
                filterField = query.filters[0].column.field
                filters = query.filters[0].value
              }

              api
                .get(
                  `/control?per_page=${query.pageSize}&page=${
                    query.page + 1
                  }&search=${query.search}&columnOrder=${field}&order=${
                    query.orderDirection
                  }&filters=${filters}&filterField=${filterField}`
                )
                .then((result) => {
                  resolve({
                    data: result.data.control,
                    page: query.page,
                    totalCount: result.data.total,
                  })
                })
            })
          }
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
                handleOpenModal(rowData)
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
