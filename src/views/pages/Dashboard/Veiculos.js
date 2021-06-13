import React, { createRef } from 'react'
import MaterialTable from 'material-table'
import Swal from 'sweetalert2'

import { tableIcons } from '../../../utils/TableIcons'
import api from '../../../services/api'

export default function Veiculos() {
  const tableRef = createRef()

  const handleOpenModal = (dados) => {
    Swal.fire({
      title: `<strong>Informações Gerais</strong>`,
      html:
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
            `<li><strong>Função</strong> : ${dados.funcao} </li><br> `,
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
              field: 'placa',
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
              field: 'nome',
              type: 'string',
              filtering: false,
            },
          ]}
          data={(query) =>
            new Promise((resolve, reject) => {
              let field = ''
              if (query.orderBy !== undefined) field = query.orderBy.field
              api
                .get(
                  `/vehicles?per_page=${query.pageSize}&page=${
                    query.page + 1
                  }&search=${query.search}&columnOrder=${field}&order=${
                    query.orderDirection
                  }`
                )
                .then((result) => {
                  resolve({
                    data: result.data.vehicles,
                    page: query.page,
                    totalCount: result.data.total,
                  })
                })
            })
          }
          title="Listagem de Veículos"
          icons={tableIcons}
          options={{
            filtering: false,
          }}
          actions={[
            {
              icon: tableIcons.ListIcon,
              tooltip: 'Visualizar Proprietário',
              onClick: (event, rowData) => {
                handleOpenModal(rowData)
              },
            },
            {
              icon: tableIcons.RefreshIcon,
              tooltip: 'Atualizar Tabela',
              isFreeAction: true,
              onClick: () =>
                tableRef.current && tableRef.current.onQueryChange(),
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
