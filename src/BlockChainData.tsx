import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, IStateResponse, IWebSocketResponse } from "./types";
import { Button } from "react-bootstrap";
import * as _ from "lodash";
import TransactionDetails from "./components/TransactionDetails";
export default class BlockChainData extends Component<{}, IStateResponse> {
  ws = new WebSocket("wss://ws.blockchain.info/inv");
  constructor(props: any) {
    super(props);
    this.state = {
      webSocketResponse: [],
      trnsactions: [],
      showDetails: false,
    };
  }

  subscribe() {
    this.ws.send('{"op":"unconfirmed_sub"}');
    // setTimeout(() => {
    //   this.ws.close();
    // }, 5000);
  }

  unSubscribe() {
    this.ws.close();
  }

  ShowTransactionDetails(e: any, sequenceNo: any) {
    const trandetails = _.filter(this.state.trnsactions, function (o) {
      return o.sequence == sequenceNo;
    });
    if (trandetails.length > 0) {
      this.setState(
        {
          transactionDetails: trandetails,
        },
        () => {
          this.setState({ showDetails: true });
        }
      );
    }
  }
  componentDidMount() {
    this.ws.onopen = () => {
      console.log("hello socket");
    };
    this.ws.onmessage = (message) => {
      const response: IWebSocketResponse = JSON.parse(message.data);
      this.setState({
        webSocketResponse: [...this.state.webSocketResponse, response],
      });
      this.setState({
        trnsactions: [...this.state.trnsactions, ...response.x.inputs],
      });
    };
  }
  render() {
    return (
      <>
        <button onClick={() => this.subscribe()}>Connect</button>
        <button onClick={() => this.unSubscribe()}>Disconnect</button>

        {this.state && this.state.trnsactions.length > 0 ? (
          <div>
            {_.uniqBy(this.state.trnsactions, "sequence").map(
              (data: Input, i: any) => {
                return (
                  <div key={i}>
                    <Button
                      key={i}
                      onClick={(e) =>
                        this.ShowTransactionDetails(e, data.sequence)
                      }
                    >
                      {data.sequence}
                    </Button>{" "}
                  </div>
                );
              }
            )}
            {this.state.showDetails && (
              <TransactionDetails details={this.state.transactionDetails} />
            )}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
