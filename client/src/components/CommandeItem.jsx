import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { FaChevronDown, FaMessage, FaPhone } from "react-icons/fa6";
import React from "react";
import Dialog from "./Dialog";
import { BASE_URL } from "../api/common";

function CommandeItem({ commande }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userData = JSON.parse(sessionStorage.getItem("userData"));
	function doAction(state) {
		fetch(`${BASE_URL}action/${commande.id}`, {
			method: "POST",
			headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
			body: JSON.stringify({ status: state, user_id: userData.id }),
		}).then((res) => res.ok && window.location.reload());
	}
	return (
		<>
			<GridItem w={"full"}>
				<Card>
					<CardHeader>
						<Flex alignItems={"center"}>
							<Heading size={"md"}>Commande</Heading>
							<Spacer />
							<Badge>
								<Text>{commande.numero_commande}</Text>
							</Badge>
						</Flex>
					</CardHeader>
					<CardBody>
						<Box>
							<Text>
								<b>Nom du client</b>: {commande.name}
							</Text>
							<Text>
								<b>Contact</b> : {commande.numero_client}{" "}
								<Icon as={FaPhone}></Icon> <Icon as={FaMessage} />
							</Text>
							<Text>
								<b>Ville de livraison</b>: {commande.quartier}
							</Text>
							<Text>
								<b>Adresse de livraison</b>: {commande.address_livraison}
							</Text>
						</Box>
					</CardBody>
					<CardHeader>
						<Flex
							gap={2}
							flexDirection={{ base: "column", xl: "row" }}>
							<Button
								variant={"black"}
								bg={"blackAlpha.400"}
								_hover={{ bg: "blackAlpha.500" }}
								onClick={onOpen}>
								Voir les articles commandés
							</Button>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<FaChevronDown />}
									variant={"green"}
									bg={"green.400"}
									_hover={{ bg: "green.500" }}>
									Status
								</MenuButton>
								<MenuList>
									<MenuItem onClick={() => doAction("Livrée")}>Livrée</MenuItem>
									<MenuItem
										color={"red.700"}
										onClick={() => doAction("Annulée")}>
										Annulée
									</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</CardHeader>
				</Card>
			</GridItem>
			<Dialog
				onClose={onClose}
				isOpen={isOpen}
				title='Article Commandées'
				hasHeader={true}>
				<Grid
					templateColumns={{ base: "repeat(1,1fr)", xl: "repeat(2,1fr)" }}
					gap={3}>
					{commande.articles_commandes.length > 0 &&
						commande.articles_commandes.map((article) => (
							<GridItem>
								<Card>
									<CardBody>
										<Heading size={"md"}>{article.name}</Heading>
									</CardBody>
									<CardFooter>
										<Text>Quantité: {article.quantite}</Text>
									</CardFooter>
								</Card>
							</GridItem>
						))}
				</Grid>
			</Dialog>
		</>
	);
}

export default CommandeItem;