import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import Walle from "../../img/Wallet.png";


const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
    pointerEvents: "none",
  },
};

function Wallet() {
  const { authenticate, isAuthenticated, logout, account, chainId } =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!isAuthenticated) {
    return (
      <div
        
        onClick={() =>
          authenticate({
            signingMessage: "Welcome to Chess Pos",
            chainId: 80001,
          })
        }
      >
        <div className="imgFlexNft">
        <img src={Walle} className="walletImg" />
          <div className="wallImgText">Connect Wallet</div>
          </div>
      </div>
    );
  }

  return (
    <>
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
        
        onClick={() => {
          console.log("Open model");
          setIsModalVisible(true);
        }}
      >
        <p
          style={{ marginRight: "5px", ...styles.text, pointerEvents: "none", color: "white", fontWeight: "500" }}

        >
          {getEllipsisTxt(account, 6)}
        </p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
          
            avatar="left"
            size={6}
            copyable
            
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            logout();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Wallet;
