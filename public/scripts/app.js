
var AdsTable = React.createClass({
  getInitialState: function() {
    return {
      ads: null,
      ads_metrics: null
    };
  },
  componentDidMount: function() {

    $.when(
      $.get(this.props.ads_url),
      $.get(this.props.ads_metrics_url)
    ).then(function(resp1, resp2){
      this.setState({
        ads: resp1[0].ads,
        ads_metrics: resp2[0]
      })
    }.bind(this));

  },
  render: function() {

    return (
      <div className="adsTable">
        <h1>HYFN8 Front End Code Challenge</h1>
        <div className="table-wrapper">
          <TableComponent ads={this.state.ads} ads_metrics={this.state.ads_metrics} />
        </div>
      </div>
    );
  }
});

var TableComponent = React.createClass({

  render: function() {
    if(this.props.ads && this.props.ads_metrics){

      var adMetrics;

      var tableRows = this.props.ads.map(function(adItem){
        adMetrics = null;

        this.props.ads_metrics.rows.map(function(row){
          if(adItem.remote_id === row.remote_id){
            adMetrics = row;
          }
        });

        return (
          <TableRowComponent item={adItem} order={this.props.ads_metrics.column_names} metrics={adMetrics} />
        );
      }.bind(this));

      return (
        <table>
          <thead>
            <TableHeadComponent names={this.props.ads_metrics.column_names} />
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      );
    }
    else{
      return (
        <table></table>
      );
    }
  }
});


var TableHeadComponent = React.createClass({

  render: function() {
    var tableHeaders = this.props.names.map(function(name){
        return (<th>{name}</th>);
    });

    return (
      <tr>
        <th>name</th>
        {tableHeaders}
      </tr>
    );
  }
});

var TableRowComponent = React.createClass({

  render: function() {

    var metricsRow = this.props.order.map(function(title){
      return (<td>{this.props.metrics[title]}</td>)
    }.bind(this));

    return (
      <tr>
        <th>
          {this.props.item.name}
        </th>
        {metricsRow}
      </tr>
    );
  }
});


ReactDOM.render(
  <AdsTable ads_url="api_ads.json" ads_metrics_url="api_ads_metrics.json"/>,
  document.getElementById('content')
);
