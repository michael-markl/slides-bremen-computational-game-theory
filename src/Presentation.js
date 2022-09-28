import React, { useRef, useContext } from "react";
import { createRoot } from "react-dom/client";
import {
    FlexBox,
    Heading,
    UnorderedList,
    ListItem as OriginalListItem,
    Stepper,
    Slide,
    Deck,
    Text,
    Box,
    Appear,
    OrderedList,
    Table,
    TableHeader,
} from "spectacle";
import styled from "styled-components";
import performance from "./performance2.png";
import sampleNetwork from "./network2.png";
import { ThemeProvider } from "styled-components";

import { animated, useSpring, useChain } from "react-spring";
import { Example1Svg } from "./example1";
import { Example2Svg } from "./example2";
import { BTex, Tex } from "./tex";
import {
    ConstantPredictorSvg,
    LinearPredictorSvg,
    RegressionPredictorSvg,
    RegularizedLinearPredictorSvg,
    ZeroPredictorSvg,
} from "./predictorFigures";
import { Example3Svg } from "./example3";

import { DeckContext } from "spectacle";

const ListItem = (props) => (
    <OriginalListItem style={{ margin: "10px" }} {...props} />
);

const theme = {
    fonts: {
        header: '"Open Sans", Helvetica, Arial, sans-serif',
        text: '"Open Sans", Helvetica, Arial, sans-serif',
        head: '"Open Sans", Helvetica, Arial, sans-serif',
    },
    fontWeights: {
        bold: 600,
    },
    colors: {
        // https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=B0BEC5&secondary.color=F57F17
        primary: "#000",
        secondary: "#41738b",
        tertiary: "#f5f5f5",
        quartary: "#666",
    },
    fontSizes: {
        h1: "48px",
        h2: "32px",
        h3: "28px",
        head: "16px",
        text: "18px",
    },
};

const template = () => {
    const { slideCount, activeView } = useContext(DeckContext);
    //const slideCount = 0
    //const activeView = { slideIndex: 0 }
    return (
        <Box
            justifyContent="space-between"
            position="absolute"
            bottom={0}
            right="32px"
            zIndex={1}
        >
            <Text style={{ margin: 0, padding: 0, color: theme.colors.quartary }}>
                <span style={{ color: theme.colors.secondary }}>
                    {activeView.slideIndex + 1}
                </span>{" "}
                / {slideCount}
            </Text>
        </Box>
    );
};

const SubHeading = (props) => (
    <Text color="secondary" textAlign="center" fontSize="h3" {...props} />
);

const TITLE = "Machine-Learned Prediction Equilibrium for Dynamic Traffic Assignment";
const TITLE_WITH_NEWLINES = (
    <>
        Machine-Learned Prediction Equilibrium
        <br />
        for Dynamic Traffic Assignment
    </>
);
const PRESENTER = "Michael Markl";

const CustomSlide = ({ section, intro = false, children }) => {
    if (!intro) {
        return (
            <Slide>
                <FlexBox
                    width="1"
                    flexDirection="row"
                    justifyContent="space-between"
                    borderBottom={`1px solid ${theme.colors.quartary}`}
                >
                    <Text
                        fontFamily="head"
                        fontSize="head"
                        margin="0px"
                        padding="0px"
                        style={{ letterSpacing: "-.5px", color: theme.colors.quartary }}
                    >
                        {TITLE}
                        <span style={{ padding: "0 10px" }}> — </span>
                        {section}
                    </Text>
                    <Text
                        fontFamily="head"
                        fontSize="head"
                        margin="0px"
                        padding="0px"
                        style={{ letterSpacing: "-.5px", color: theme.colors.quartary }}
                    >
                        {PRESENTER}
                    </Text>
                </FlexBox>
                {children}
            </Slide>
        );
    }

    return (
        <Slide>
            <Stepper values={["hide"]} alwaysVisible>
                {(value, step, isActive) => {
                    const bigSectionSpringRef = useRef();
                    const bigSectionSpring = useSpring({
                        ref: bigSectionSpringRef,
                        to: isActive ? { opacity: 0 } : { opacity: 1 },
                    });
                    const slideSpringRef = useRef();
                    const slideSpring = useSpring({
                        ref: slideSpringRef,
                        to: isActive ? { opacity: 1 } : { opacity: 0 },
                    });

                    useChain(
                        isActive
                            ? [bigSectionSpringRef, slideSpringRef]
                            : [slideSpringRef, bigSectionSpringRef]
                    );
                    return (
                        <>
                            <FlexBox
                                width="1"
                                flexDirection="row"
                                justifyContent="space-between"
                                borderBottom={`1px solid ${theme.colors.quartary}`}
                            >
                                <Text
                                    fontFamily="head"
                                    fontSize="head"
                                    margin="0px"
                                    padding="0px"
                                    style={{
                                        letterSpacing: "-.5px",
                                        color: theme.colors.quartary,
                                    }}
                                >
                                    {TITLE}
                                    <animated.span style={slideSpring}>
                                        <span style={{ padding: "0 10px" }}> — </span>
                                        {section}
                                    </animated.span>
                                </Text>
                                <Text
                                    fontFamily="head"
                                    fontSize="head"
                                    margin="0px"
                                    padding="0px"
                                    style={{
                                        letterSpacing: "-.5px",
                                        color: theme.colors.quartary,
                                    }}
                                >
                                    {PRESENTER}
                                </Text>
                            </FlexBox>

                            <FlexBox
                                width={1}
                                bottom={0}
                                top={0}
                                justifyContent="center"
                                alignItems="center"
                                zIndex={-1}
                                position="absolute"
                            >
                                <Heading>
                                    <animated.div style={bigSectionSpring}>
                                        {section}
                                    </animated.div>
                                </Heading>
                            </FlexBox>
                            <animated.div style={slideSpring}>{children}</animated.div>
                        </>
                    );
                }}
            </Stepper>
        </Slide>
    );
};

export const Presentation = () => (
    <Deck theme={theme} template={template}>
        <Slide>
            <Heading margin="64px">{TITLE_WITH_NEWLINES}</Heading>
            <Text className="authors" textAlign="center" fontSize="h3">Lukas Graf<sup>1</sup>, Tobias Harks<sup>1</sup>, Kostas Kollias<sup>2</sup>, and <i>Michael Markl</i><sup>1</sup>
                <div style={{ fontSize: "0.8em", margin: "2em 0", display: "flex", justifyContent: "center" }}><span style={{ width: "300px" }}><b>1</b>: University of Augsburg</span><span style={{ width: "300px" }}><b>2</b>: Google</span></div>
            </Text>

            <Text textAlign="center" style={{ margin: "1em 0", padding: 0 }}>
                12<sup>th</sup> Computational Day(s) of Computational Game Theory
            </Text>
            <Text textAlign="center" style={{ margin: "0em 0", padding: 0 }}>
                30<sup>th</sup> of September 2022
            </Text>
            {/*<Appear>
        <Example3Svg demo={true} />
        <Text textAlign="center" style={{ margin: 0, transform: 'translateY(-150px)' }}>An example dynamic prediction equilibrium.</Text>
      </Appear>*/}
        </Slide>

        <CustomSlide intro section="I. The Flow Model">
            <SubHeading textAlign="left">The Physical Flow Model</SubHeading>
            <Box>
                <div>
                    <Box style={{ float: "right" }}>
                        <Example1Svg />
                    </Box>
                    <Text style={{ margin: "0 32px", padding: "0" }}>We are given</Text>
                    <UnorderedList style={{ margin: "0 32px" }}>
                        <ListItem>a finite, directed graph {Tex`G=(V,E)`},</ListItem>
                        <ListItem>
                            edge transit times {Tex`\tau_e > 0`} and edge capacities{" "}
                            {Tex`\nu_e> 0`} for {Tex`e\in E`}, and
                        </ListItem>
                        <ListItem>
                            source {Tex`s\in V`} and sink {Tex`t\in V`}, and a network inflow rate {Tex`u  \in \mathcal R \coloneqq L^1_{\text{loc}}(\R_{\geq 0}, \R_{\geq 0})`}
                            .
                        </ListItem>
                    </UnorderedList>
                    <Appear>
                        <Definition>
                            A <i>dynamic flow</i> {Tex`f=(f^+, f^-)`} consists of
                            <UnorderedList style={{ margin: "0" }}>
                                <ListItem>
                                    edge inflow rates {Tex`f^+_{e} \in \mathcal R`} for{" "}
                                    {Tex`e\in E`} and
                                </ListItem>
                                <ListItem>
                                    edge outflow rates {Tex`f^-_{e} \in \mathcal R`} for{" "}
                                    {Tex`e\in E`}.
                                </ListItem>
                            </UnorderedList>
                        </Definition>
                    </Appear>
                    <Appear>
                        <Notation>
                            {Tex`~~q_e(\theta) \coloneqq \int_0^\theta f^+_e\,\mathrm d\lambda  -  \int_0^{\theta + \tau_e} f^-_e \,\mathrm d\lambda`}
                        </Notation>
                    </Appear>
                    <Appear>
                        <Definition position="relative">
                            A dynamic flow {Tex`f`} is <i>feasible</i> if it fulfills the
                            following conditions:
                            <UnorderedList style={{ margin: "0" }}>
                                <ShowcaseFormula
                                    text="Flow is conserved:"
                                    formula={BTex`\sum_{e\in\delta_v^+} f^+_{e}(\theta) - \sum_{e\in\delta_v^-} f^-_{e}(\theta) 
              \begin{cases}
              = u(\theta), & \text{if $v = s$}, \\
              = 0, & \text{if $v \notin \{s, t \}$}, \\
              \leq 0, & \text{if $v = t$}.
              \end{cases}`}
                                />
                                <ShowcaseFormula
                                    text="Queues operate at capacity:"
                                    formula={BTex`f_e^-(\theta) = \begin{cases}
            \nu_e,&\text{if $q_e(\theta - \tau_e) > 0$,} \\
            \min\{ f_e^+(\theta- \tau_e), \nu_e \}, &\text{otherwise.}
          \end{cases}`}
                                />
                            </UnorderedList>
                        </Definition>
                    </Appear>
                </div>
            </Box>
        </CustomSlide>

        <CustomSlide section="I. The Flow Model">
            <SubHeading textAlign="left">The Behavioral Model</SubHeading>
            <Box style={{ textAlign: "center", marginTop: "-50px" }}>
                <Example1Svg svgIdPrefix="example1-2" overrideT={800} />
            </Box>
            <div>
                <Text style={{ textAlign: "center" }}>{Tex`T_e(\theta)\coloneqq \theta + \tau_e + \frac{q_e(\theta)}{\nu_e}`}</Text>
                <Text style={{ textAlign: "center" }}>{Tex`T_{e_1\cdots e_k}(\theta)\coloneqq \left(T_{e_k}  \right)(\theta)
        \left(\hat T_{e_k}(\,\boldsymbol{\cdot}\,;\bar\theta;f) \circ \cdots \circ \hat T_{e_1}(\,\boldsymbol{\cdot}\,;\bar\theta;f)\right)(\theta).`}</Text>
            </div>
        </CustomSlide>

        <CustomSlide section="I. The Flow Model">
            <SubHeading textAlign="left">The Behavioral Model</SubHeading>
            <Box>
                <UnorderedList margin="0 32px">
                    <Appear>
                        <ListItem>
                            The <i>exit time</i> when entering edge {Tex`e`} at time{" "}
                            {Tex`\theta`} is given by{" "}
                            {Tex`T_e(\theta)\coloneqq \theta + \tau_e + \frac{q_e(\theta)}{\nu_e}`}
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem>
                            We are given a set of{" "}
                            <i>predictors</i>{" "}
                            {BTex`
          \hat q_{e} : \mathbb R \times \mathbb R \times (\mathcal R\times \mathcal R)^{E} \to \mathbb R_{\geq 0},
          \quad
          (\theta, \bar\theta, f)\mapsto\hat q_{e}(\theta; \bar\theta; f),`}
                            where {Tex`\hat q_{e}(\theta; \bar\theta; f)`} describes the{" "}
                            <i>predicted queue length </i>
                            of edge {Tex`e`} at time {Tex`\theta`} as predicted at time{" "}
                            {Tex`\bar\theta`} using the historical flow {Tex`f`}.
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem>
                            The <i>predicted exit time</i> when entering an edge {Tex`e`} at
                            time {Tex`\theta`} is given by{" "}
                            {Tex`\hat T_{e}(\theta; \bar\theta; f)\coloneqq \theta + \tau_e + \frac{\hat q_{e}(\theta; \bar\theta, f)}{\nu_e}`}
                            .
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem>
                            The <i>predicted exit time</i> when entering a path{" "}
                            {Tex`P=(e_1, \dots, e_k)`} at time {Tex`\theta`} is given by
                            {BTex`\hat T_{i,P}(\theta; \bar\theta; f)
            \coloneqq \left(\hat T_{e_k}(\,\boldsymbol{\cdot}\,;\bar\theta;f) \circ \cdots \circ \hat T_{e_1}(\,\boldsymbol{\cdot}\,;\bar\theta;f)\right)(\theta).
            `}
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem>
                            The <i>predicted earliest arrival</i> at {Tex`t`} when starting
                            at time {Tex`\theta`} at {Tex`v`} is given by{" "}
                            {Tex`\displaystyle ~\hat l_{v}(\theta; \bar\theta; f)
            \coloneqq \min_{P\text{ simple } v\text{-}t\text{-path}} \hat T_{i,P}(\theta;\bar\theta;f).
            `}
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem style={{ marginTop: "15px", marginLeft: "10px" }}>
                            The <i>predicted delay</i> when entering an edge {Tex`e=vw`} at
                            time {Tex`\theta`} is given by{" "}
                            {Tex`\hat \Delta_{e}(\theta; \bar\theta; f)
            \coloneqq \hat l_{w}(\hat T_{e}( \theta;\bar\theta; f); \theta; f) - \hat l_{v}(\theta;\bar\theta; f).
            `}
                        </ListItem>
                    </Appear>
                </UnorderedList>
                <Appear>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Definition width="800px">
                            A pair {Tex`(\hat q, f)`} of predictors{" "}
                            {Tex`\hat q = (\hat q_{e})_{i\in I, e\in E}`} and a feasible
                            dynamic flow {Tex`f`} is a{" "}
                            <i>dynamic prediction equilibrium (DPE)</i>, if for all edges{" "}
                            {Tex`e=vw`} and all {Tex`\theta \geq 0`} it holds that
                            {BTex`
              f^+_{e}(\theta) > 0 \implies \hat\Delta_{e}(\theta,\theta, f) = 0.
          `}
                        </Definition>
                    </div>
                </Appear>
            </Box>
        </CustomSlide>

        <CustomSlide section="I. The Flow Model">
            <Example>
                A dynamic prediction equilibrium.
                <UnorderedList>
                    <Appear>
                        <ListItem>
                            We are given a single commodity with network inflow rate {Tex`u\equiv 2`} and predictor{" "}
                            {Tex`\hat q_{e}(\theta;\bar\theta; f) \coloneqq q^f_e(\bar\theta) + \partial_- q^f_e(\bar\theta)\cdot (\theta - \bar\theta)`}
                            .
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem>
                            Only edge {Tex`ut`} can build a queue. For other edges{" "}
                            {Tex`e\neq uv`} we have {Tex`\hat q_{e}(\theta;\bar\theta;f) = 0`}
                            .
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem>
                            Particles starting at {Tex`s`} need to decide between paths{" "}
                            {Tex`sut`} and {Tex`svwt`}.
                        </ListItem>
                    </Appear>
                    <Appear>
                        <ListItem>
                            We have {Tex`\hat T_{svwt}(\theta;\bar\theta; f) = \theta + 4`}{" "}
                            and{" "}
                            {Tex`\hat T_{sut}(\theta;\bar\theta; f) = \theta + 2 + \hat q_{ut}(\theta + 1;\bar\theta; f)`}
                            .
                        </ListItem>
                    </Appear>
                </UnorderedList>
            </Example>
            <Example3Svg />
        </CustomSlide>

        <CustomSlide intro section="II. Existence of DPE">
            <SubHeading textAlign="left">Example for Nonexistence</SubHeading>
            <Example>
                We are given
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <UnorderedList>
                            <Appear>
                                <ListItem>
                                    a single commodity with network inflow rate {Tex`u \equiv 2`}{" "}
                                    with predictor
                                </ListItem>
                            </Appear>
                            <Appear>
                                <ListItem>{Tex`
            \hat q_e(\theta;\bar\theta; f) \coloneqq \begin{cases}
                q_e(\bar\theta),& \text{if $q_e(\bar\theta) < 1$}, \\
                2,              & \text{otherwise.}
            \end{cases}
        `}</ListItem>
                            </Appear>
                        </UnorderedList>
                    </div>
                    <div style={{ height: "200px" }}>
                        <Example2Svg />
                    </div>
                </div>
                <Appear>
                    Starting from time {Tex`\theta = 1`}, there is no possible equilibrium
                    flow split.
                </Appear>
            </Example>
            <Appear>
                <Question>When do dynamic prediction equilibria exist?</Question>
            </Appear>
        </CustomSlide>

        <CustomSlide section="II. Existence of DPE">
            <SubHeading textAlign="left">
                Sufficient Conditions for the Existence of DPE
            </SubHeading>
            <Appear>
                <Definition>
                    A predictor {Tex`\hat q_{e}`} is <i>{Tex`p`}-continuous</i> with{" "}
                    {Tex`p \geq 1`}, if for all {Tex`M > 0`} and compact intervals{" "}
                    {Tex`D`} the mapping{" "}
                    {BTex`
       \mathcal A: \quad f^+ \mapsto \hat q_{e}(${emptyArg},${emptyArg}, f)
       ,`}{" "}
                    where {Tex`f`} is the deterministic flow with inflow rates {Tex`f^+`},
                    is sequentially weak-strong continuous from{" "}
                    {Tex`L^p([0, M])^{ E}`} to {Tex`C([0,M]\times D)`}.
                </Definition>
            </Appear>
            <Appear>
                <Definition>
                    A predictor {Tex`\hat q_{e}`} is <i>oblivious</i>, if for all{" "}
                    {Tex`\bar\theta \in\mathbb R_{\geq0}`} it holds{" "}
                    {Tex`
        \quad\forall f,f'\colon\quad
    f_{\hspace{.07em}\vert\hspace{.07em}[0, \bar\theta]^{ E}} ~\overset{a.e.}{\underset{c.w.}{=}}~ f'_{\hspace{.07em}\vert\hspace{.07em}[0, \bar\theta]^{ E}}
    \implies
    \hat q_{e}(\,\boldsymbol{\cdot}\,;\bar\theta;f)=\hat q_{e}(\,\boldsymbol{\cdot}\,;\bar\theta;f').
        `}
                </Definition>
            </Appear>

            <Appear>
                <Definition>
                    A predictor {Tex`\hat q_{e}`} <i>respects FIFO</i>, if{" "}
                    {Tex`\hat T_{e}(\,\boldsymbol{\cdot}\,;\bar\theta, f)`} is
                    non-decreasing for all {Tex`\bar\theta\in \R_{\geq0}`} and
                    deterministic flows {Tex`f`}.
                </Definition>
            </Appear>

            <Appear>
                <Theorem>
                    If {Tex`u\in L^p_{\text{loc}}(\mathbb R, \mathbb R_{\geq 0})`} and all
                    predictors {Tex`\hat q_{i, e}`} are {Tex`p`}-continuous, oblivious,
                    and respect FIFO for some {Tex`p>1`},<br /> then there exists a flow{" "}
                    {Tex`f`} such that {Tex`(\hat q, f)`} is a dynamic prediction
                    equilibrium.
                </Theorem>
            </Appear>
        </CustomSlide>

        <CustomSlide section="II. Existence of DPE">
            <SubHeading textAlign="left">Sketch of the Existence Proof</SubHeading>
            <Appear>
                <Definition margin="-10px 32px -10px 32px">
                    Given a Banach space {Tex`(X, \lVert ${emptyArg} \rVert_X)`} with
                    canonical pairing {Tex`\langle ${emptyArg}, ${emptyArg} \rangle`}{" "}
                    between {Tex`X`} and its continuous dual space {Tex`X'`}.
                    <br />A map {Tex`\mathcal A: X\to Y`} into another Banach space{" "}
                    {Tex`(Y, \lVert ${emptyArg} \rVert_Y)`} is{" "}
                    <i>sequentially weak-strong continuous</i>, if for any sequence{" "}
                    {Tex`(x_i)_{i\in\mathbb N}`} and {Tex`x\in X`}
                    {BTex`
          \left(\forall x' \in X': \langle x_i, x'\rangle \xrightarrow[i\to\infty]{} \langle x, x' \rangle\right)
          \quad\implies\quad
          \lVert \mathcal A(x_i) - \mathcal A(x)\rVert_Y \xrightarrow[i\to\infty]{} 0
          .`}
                </Definition>
            </Appear>
            <Appear>
                <Theorem label="Brézis 1968">
                    Let {Tex`(X, \lVert ${emptyArg} \rVert)`} be a reflexive Banach space
                    and {Tex`\langle ${emptyArg}, ${emptyArg} \rangle`} the canonical
                    pairing between {Tex`X`} and its continuous dual space {Tex`X'`}.
                    <br />
                    Let {Tex`\mathcal{A}: K\to X'`} be a sequentially weak-strong
                    continuous map defined on a non-empty, closed, bounded and convex set{" "}
                    {Tex`K\subseteq X`}.
                    <br />
                    Then there exists a solution {Tex`u\in K`} to the variational
                    inequality{" "}
                    {BTex`
        \forall v \in K: \quad
        \langle{\mathcal A(u)},{v - u}\rangle \geq 0
    .`}
                </Theorem>
            </Appear>
            <Appear>
                <Lemma margin="0 32px">
                    Assume all network inflow rates are{" "}
                    {Tex`L_{\text{loc}}^{p}(\mathbb R, \mathbb R_{\geq0})`}, and all
                    predictors are oblivious, {Tex`p`}-continuous and respect FIFO with{" "}
                    {Tex`p> 1`}.
                    <br />
                    Given a DPE flow {Tex`f`} up to time {Tex`H`} with{" "}
                    {Tex`f^+\in L_{\text{loc}}^{p}(\mathbb R_{\geq0},\mathbb R_{\geq0})^{ E}`}
                    , there exists a DPE flow {Tex`h`} up to time {Tex`H+\alpha`} with{" "}
                    {Tex`\alpha \coloneqq \min_{e\in E}\tau_e`}
                    <br />
                    such that {Tex`h_{\leq H} \overset{a.e.}{=} f_{\leq H}`} and{" "}
                    {Tex`h^+\in L_{\text{loc}}^{p}(\mathbb R, \mathbb R_{\geq0})^{ E}`}{" "}
                    hold.
                </Lemma>
            </Appear>
            <Appear>
                <Text style={{ margin: "8px 32px 0 32px", padding: 0 }}>
                    <i>Proof Sketch.</i>
                </Text>
            </Appear>
            <UnorderedList margin="0px 16px">
                {/*<ListItem>
        For {Tex`p > 1`}, {Tex`L^p([a, b])`} is a reflexive Banach space with continuous dual space {Tex`L^q([a,b])`} and canonical pairing {Tex`\langle f, g\rangle \coloneqq \int_{[a,b]} f \cdot g \,\mathrm d\lambda`}.
        </ListItem>*/}
                <Appear>
                    <ListItem>
                        The mapping{" "}
                        {Tex`\mathcal A: f^+ \mapsto (\theta\mapsto \hat\Delta_{e}(\theta,\theta,f))_{e}`}{" "}
                        is sequentially weak-strong continuous from{" "}
                        {Tex`L^p([H,H+\alpha])^{ E}`} to{" "}
                        {Tex`L^q([H,H+\alpha])^{ E}`}.
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        We use{" "}
                        {Tex`\displaystyle~ K\coloneqq \left\{ f^+\in L^p([H, H+\alpha], \mathbb R_{\geq0})^{ E} \,\middle|\,  \begin{array}{c r c l}
                \forall i\in I, v\in V\setminus\{t\} : & \sum_{e\in\delta_{v}^+} f^+_{e}   & \overset{a.e.}{=} & b_{v}^+,  \\
                \forall i\in I :                         & \sum_{e\in\delta_{t}^+} f^+_{e} & \overset{a.e.}{\leq}  & b_{i,t}^+ \\
            \end{array} \right\}.`}
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        A solution to the variational inequality corresponds to a DPE flow
                        up to time {Tex`H+\alpha`}.
                    </ListItem>
                </Appear>
            </UnorderedList>
        </CustomSlide>

        <CustomSlide section="II. Existence">
            <SubHeading textAlign="left">
                Sufficient Conditions for {Tex`p`}-continuity
            </SubHeading>
            <Lemma>
                If a predictor {Tex`\hat q_{i}`} has the form{" "}
                {BTex`
            \hat q_{e}(\theta,\bar\theta, f) = \gamma_{e}\left(
                  \theta,
                  \bar\theta,
                  F_{ E}^{+,f},
                  F_{E}^{-,f},
                  q^f_E
                  \right)
                  \quad\quad
                  \text{with~~$F_{ E}^{+,f} = (\xi \mapsto \int_0^\xi f_{e}^+\,\mathrm d\lambda)_{e}$,~~$F_{E}^{+,f} = (\xi \mapsto \int_0^\xi f_{e}^-\,\mathrm d\lambda)_{e}$}
          `}
                and if {Tex`\gamma_{e}`} is continuous from{" "}
                {Tex`\mathbb R\times \mathbb R\times C(\mathbb R_{\geq0}, \mathbb R_{\geq 0})^{( E)+E+E}`}{" "}
                to {Tex`\mathbb R_{\geq0}`}, where all {Tex`C(\R_{\geq0},\R_{\geq0})`}{" "}
                are equipped with the topology induced by the extended uniform norm,
                then {Tex`\hat q_{i}`} is a {Tex`p`}-continuous predictor for any{" "}
                {Tex`p > 1`}.
            </Lemma>
        </CustomSlide>

        <CustomSlide intro section="III. Applied Predictors">
            <SubHeading textAlign="left">Applied Predictors</SubHeading>
            <div
                style={{
                    position: "relative",
                    top: "-50px",
                    marginLeft: "1050px",
                    width: "200px",
                    textAlign: "center",
                    fontFamily: "'Open Sans'",
                    fontSize: theme.fontSizes.text,
                }}
            >
                Compatible with Existence-Theorem
            </div>
            <UnorderedList style={{ position: "relative", top: "-50px" }}>
                <PredictorListItem
                    text={
                        <>
                            <i>The Zero-Predictor </i>
                            {Tex`\hat q^{\text{Z}}_{e}(\theta;\bar\theta;f) \coloneqq 0`}.
                            <br />
                            <Appear>
                                <p>Predicted shortest paths always remain the same.</p>
                            </Appear>
                        </>
                    }
                    figure={(minimize) => <ZeroPredictorSvg minimize={minimize} />}
                    compatible
                />
                <PredictorListItem
                    text={
                        <>
                            <i>The constant predictor </i>
                            {Tex`\hat q^{\text{C}}_{e}(\theta;\bar\theta;f) \coloneqq q^f_e(\bar\theta)`}
                            .<br />
                            <Appear>
                                <p>Assumes the current conditions for the future.</p>
                            </Appear>
                        </>
                    }
                    figure={(minimize) => <ConstantPredictorSvg minimize={minimize} />}
                    compatible
                />
                <PredictorListItem
                    text={
                        <>
                            <i>The linear predictor </i>
                            {Tex`\hat q^{\text{L}}_{e}(\theta;\bar\theta;f) \coloneqq 
          \left( q^f_e(\bar \theta)+\partial_-q^f_e(\bar \theta)\cdot \min\{ \theta-\bar\theta, H \} \right)^+
          `}
                            .
                            <Appear>
                                <p>
                                    Not continuous in {Tex`\bar\theta`} whenever{" "}
                                    {Tex`\partial_-q^f_e`} jumps.
                                </p>
                            </Appear>
                        </>
                    }
                    figure={(minimize) => <LinearPredictorSvg minimize={minimize} />}
                    compatible={false}
                />
                <PredictorListItem
                    text={
                        <>
                            <i>The regularized linear predictor </i>
                            <br />
                            <div
                                style={{ textAlign: "center" }}
                            >{Tex`\hat q_{e}^{\text{RL}}(\theta;\bar\theta; f) \coloneqq
\Big( q^f_e(\bar\theta) + \frac{q^f_e(\bar\theta) - q^f_e(\bar\theta - \delta)}{\delta} \cdot \min\{ \theta - \bar\theta, H \} \Big)^+
      .`}</div>
                        </>
                    }
                    figure={(minimize) => (
                        <RegularizedLinearPredictorSvg minimize={minimize} />
                    )}
                    compatible
                />
                <PredictorListItem
                    text={
                        <>
                            <i>The linear regression predictor </i>{" "}
                            {Tex`\hat q_{e}^{\text{ML}}`} linearly interpolates the points{" "}
                            <br />
                            <div style={{ textAlign: "center" }}>
                                <MLPredictorStepper />
                            </div>
                        </>
                    }
                    figure={(minimize) => <RegressionPredictorSvg minimize={minimize} />}
                    compatible
                />
            </UnorderedList>
        </CustomSlide>

        <CustomSlide section="III. Applied Predictors">
            <SubHeading textAlign="left">
                A generalization of popular models
            </SubHeading>
            <Text style={{ marginBottom: 0 }}>
                We are given a dynamic prediction equilibrium {Tex`(\hat q, f)`}.
            </Text>
            <Appear>
                <Text style={{ marginBottom: 0, marginTop: 0 }}>
                    If all commodites use
                </Text>
            </Appear>
            <UnorderedList style={{ marginTop: 0 }}>
                <Appear>
                    <ListItem style={{ marginTop: 16 }}>
                        the <i>constant predictor</i>{" "}
                        {Tex`\hat q_{e}(\theta;\bar\theta;f)\coloneqq q^f_e(\bar\theta)`},
                        then {Tex`f`} is an <i>instantaneous dynamic equilibrium (IDE)</i>.
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem style={{ marginTop: 32 }}>
                        the <i>perfect predictor</i>{" "}
                        {Tex`\hat q_{e}(\theta;\bar\theta;f)\coloneqq q^f_e(\theta)`},
                        then {Tex`f`} is a <i>dynamic (Nash) equilibrium (DE)</i>.
                    </ListItem>
                </Appear>
            </UnorderedList>
            <Appear>
                <Text>
                    IDE and especially DE have been studied quite extensively in the past.
                </Text>
            </Appear>
            <Appear>
                <Text style={{ marginTop: 0 }}>
                    DPE generalize both concepts with a more realistic scenario.
                </Text>
            </Appear>
        </CustomSlide>

        <CustomSlide intro section="IV. Computational Study">
            <SubHeading textAlign="left">Extension-based Simulation</SubHeading>
            <UnorderedList>
                <Appear>
                    <ListItem>
                        Approximate a DPE by rerouting agents in discrete time intervals{" "}
                        {Tex`\bar\theta_k = k\cdot \varepsilon`}.
                        <Appear>
                            <Definition>
                                A pair {Tex`(\hat q, f)`} of predictors {Tex`\hat q`} and a
                                feasible flow {Tex`f`} is an {Tex`\varepsilon`}-DPE, if for all{" "}
                                {Tex`\theta\in\mathbb R`}{" "}
                                {BTex`
            f_{e}^+(\theta) > 0 \implies \hat\Delta_{e}(\lfloor \theta / \varepsilon\rfloor\cdot \varepsilon, \lfloor \theta / \varepsilon\rfloor\cdot \varepsilon, f) = 0.
          `}
                            </Definition>
                        </Appear>
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        We assume that the network inflow rates {Tex`u`} are piecewise
                        constant with finite jumps
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        The extension procedure for one routing interval{" "}
                        {Tex`(\bar\theta_k,\bar\theta_{k+1})`} given an {Tex`\varepsilon`}
                        -DPE flow up to time {Tex`H = \bar\theta_k`}:
                        <div style={{ width: "1200px" }}>
                            <ThemeProvider theme={{ size: { width: "1200px" } }}>
                                <OrderedList
                                    style={{
                                        backgroundColor: "white",
                                        border: "1px solid lightgray",
                                        fontFamily: "",
                                    }}
                                >
                                    <Appear>
                                        <ListItem>
                                            Gather predictions{" "}
                                            {Tex`(\hat q_{e}(${emptyArg};\bar\theta_k; f))_{e}`}{" "}
                                            for {Tex`\bar\theta_k`}
                                        </ListItem>
                                    </Appear>
                                    <Appear>
                                        <ListItem>
                                            Compute all shortest {Tex`v`}-{Tex`t`}-paths at time{" "}
                                            {Tex`\bar\theta_k`} predicted at time {Tex`\bar\theta_k`}
                                        </ListItem>
                                    </Appear>
                                    <Appear>
                                        <ListItem>
                                            <Code>while </Code>
                                            {Tex`H < \bar\theta_{k+1}`}
                                            <Code> do:</Code>
                                        </ListItem>
                                    </Appear>
                                    <Appear>
                                        <ListItem>
                                            <Code> </Code>Compute maximal{" "}
                                            {Tex`H'\leq\bar\theta_{k+1}`} such that{" "}
                                            {Tex`b_{v}^-(\theta)\coloneqq \sum_{e\in\delta_{v}^-} f_{e}^-(\theta) + u(\theta)\cdot\mathbf{1}_{v=s}`}{" "}
                                            is constant on {Tex`(H, H')`} for all{" "}
                                            {Tex`v\in V`}
                                        </ListItem>
                                    </Appear>
                                    <Appear>
                                        <ListItem>
                                            <Code> </Code>Equally distribute {Tex`b_{v}^-(\theta)`}{" "}
                                            to the outgoing edges lying on shortest paths during{" "}
                                            {Tex`(H, H')`}
                                        </ListItem>
                                    </Appear>
                                    <Appear>
                                        <ListItem>
                                            <Code> </Code>
                                            {Tex`H \leftarrow H'`}
                                        </ListItem>
                                    </Appear>
                                </OrderedList>
                            </ThemeProvider>
                        </div>
                    </ListItem>
                </Appear>
            </UnorderedList>
        </CustomSlide>

        <CustomSlide section="IV. Computational Study">
            <SubHeading textAlign="left">
                Comparing the Performance of Predictors
            </SubHeading>
            <UnorderedList>
                <Appear>
                    <ListItem>
                        We monitor the average travel time of particles over multiple DPE
                        simulations with varying inflow rates.
                    </ListItem>
                </Appear>
                <Appear>
                    <ListItem>
                        For a sample network, the linear regression already performs best:
                        <Minimizer>
                            {(minimize) => (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        marginTop: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            transition: "transform 0.2s",
                                            transform: minimize
                                                ? "translateY(0)"
                                                : "translateY(80px) scale(1.2)",
                                            textAlign: "center",
                                        }}
                                    >
                                        <img src={sampleNetwork} width="200px" />
                                        <Text style={{ margin: 0 }}>
                                            Edges are labeled with {Tex`(\tau_e, \nu_e)`}
                                        </Text>
                                    </div>
                                    <div>
                                        <img
                                            style={{
                                                transition: "transform 0.2s",
                                                transform: minimize ? "scale(1)" : "scale(1.8)",
                                                transformOrigin: "top",
                                                width: "280px",
                                            }}
                                            src={performance}
                                        />
                                    </div>
                                </div>
                            )}
                        </Minimizer>
                    </ListItem>
                </Appear>

                <Appear>
                    <ListItem>
                        Simulations in real-world road traffic networks (centre of Tokyo,
                        Sioux Falls) show
                        <UnorderedList>
                            <ListItem>
                                the linear regression predictor is amongst the best predictors
                                analyzed,
                            </ListItem>
                            <Appear>
                                <ListItem>
                                    the Zero-Predictor performs worst most of the time,
                                </ListItem>
                            </Appear>
                            <Appear>
                                <ListItem>
                                    the simulation is capable of computing DPE in large-scale
                                    networks.
                                </ListItem>
                            </Appear>
                        </UnorderedList>
                    </ListItem>
                </Appear>
            </UnorderedList>
        </CustomSlide>

        <CustomSlide intro section="V. Conclusion">
            <CustomTable
                style={{ margin: "100px auto", textAlign: "center" }}
                width={0.8}
            >
                <TableHeader textAlign="center">
                    <th>Contributions</th>
                    <th>Future Work</th>
                </TableHeader>
                <colgroup>
                    <col style={{ width: "50%" }} />
                    <col style={{ width: "50%" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <UnorderedList style={{ display: "inline-block" }}>
                                <Appear>
                                    <ListItem>
                                        A mathematically concise model that generalizes existing
                                        rather unrealistic models.
                                    </ListItem>
                                </Appear>
                                <Appear>
                                    <ListItem>
                                        Within this model, equilibria exist under mild assumptions on
                                        the predictors.
                                    </ListItem>
                                </Appear>
                                <Appear>
                                    <ListItem>
                                        The framework allows the integration of arbitrary ML methods
                                        as predictors.
                                    </ListItem>
                                </Appear>
                                <Appear>
                                    <ListItem>
                                        The simulation and visualisation allows to test various
                                        predictors in real world traffic networks.
                                    </ListItem>
                                </Appear>
                            </UnorderedList>
                        </td>
                        <td>
                            <UnorderedList style={{ display: "inline-block" }}>
                                <Appear>
                                    <ListItem>
                                        Is the existence still given if we allow {Tex`\tau_e=0`} on
                                        some edges?
                                    </ListItem>
                                </Appear>
                                <Appear>
                                    <ListItem>
                                        Generalize the predictors' inputs to allow for other flow
                                        related data than past queues.
                                    </ListItem>
                                </Appear>
                                <Appear>
                                    <ListItem>
                                        Embed more advanced ML methods for traffic forecast into the
                                        simulation.
                                    </ListItem>
                                </Appear>
                            </UnorderedList>
                        </td>
                    </tr>
                </tbody>
            </CustomTable>
        </CustomSlide>
    </Deck>
);

const emptyArg = String.raw`\,\boldsymbol\cdot\,`;

const CustomTable = styled(Table)`
  border-collapse: collapse;
  & td {
    border: 2px solid ${theme.colors.secondary};
  }
  & tr:first-child td {
    border-top: 0;
  }
  & tr td,
  th {
    border-left: 0;
  }
  & tr:last-child td {
    border-bottom: 0;
  }
  & tr td,
  th {
    border-right: 0;
  }

  & li {
    padding: 20px;
  }
`;

const Code = (props) => <span style={{ whiteSpace: "pre" }} {...props} />;
const MLPredictorStepper = () => {
    return (
        <Stepper values={[1, 2]} alwaysVisible>
            {(value, step, isActive) => {
                if (!value) {
                    return Tex`
          \left(
            \bar\theta + j\delta,
            {\color{transparent} \left(
              \sum_{e' \in N(e)} 
                {\color{black} \sum_{i=0}^k a_{i,j}^{\color{transparent}e'}\cdot q^f_{e{\color{transparent}'}}(\bar\theta-i\delta) }
              \right)^+ } 
          \right)
      .`;
                } else if (value == 1) {
                    return Tex`
          \left(
            \bar\theta + j\delta,
            {\color{transparent} \left(
              {\color{black}
              \sum_{e' \in N(e)} 
                 \sum_{i=0}^k a_{i,j}^{e'}\cdot q^f_{e'}(\bar\theta-i\delta) }
              \right)^+ } 
          \right)
      .`;
                } else {
                    return Tex`
          \left(
            \bar\theta + j\delta,
             \left(  
              \sum_{e' \in N(e)} 
                 \sum_{i=0}^k a_{i,j}^{e'}\cdot q^f_{e'}(\bar\theta-i\delta)
              \right)^+
          \right)
      .`;
                }
            }}
        </Stepper>
    );
};

const PredictorListItem = ({ text, figure, compatible }) => {
    return (
        <Appear>
            <ListItem>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "700px", height: "100px" }}>{text}</div>
                    <div style={{ height: "90px" }}>
                        <Minimizer>{figure}</Minimizer>
                    </div>
                    <div
                        style={{
                            height: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "160px",
                        }}
                    >
                        <Appear>{compatible ? "✔️" : "❌"}</Appear>
                    </div>
                </div>
            </ListItem>
        </Appear>
    );
};

const Minimizer = ({ children }) => {
    return (
        <Stepper values={[true]} alwaysVisible>
            {(value, step, isActive) => {
                return children(value || false);
            }}
        </Stepper>
    );
};

const ShowcaseFormula = ({ formula, text }) => {
    return (
        <Stepper values={[true, false]}>
            {(value, step, isActive) => {
                return (
                    <ListItem
                        style={{ display: value === false ? "list-item" : "block" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                height: "30px",
                                transition: "transform 0.2s",
                                transform:
                                    value === false ? "translateY(0px)" : "translateY(20px)",
                            }}
                        >
                            <div>{text}</div>
                            <div
                                style={{
                                    paddingLeft: "15px",
                                    transition: "transform 0.2s",
                                    transform: value === false ? "scale(.5)" : "scale(1)",
                                    transformOrigin: "left",
                                }}
                            >
                                {formula}
                            </div>
                        </div>
                    </ListItem>
                );
            }}
        </Stepper>
    );
};

const Notation = ({ children }) => {
    return (
        <Box
            margin="32px"
            style={{ fontSize: theme.fontSizes.text, fontFamily: "Open Sans" }}
        >
            <span>
                <i>Notation. </i>
            </span>
            {children}
        </Box>
    );
};

const Question = ({ children }) => {
    return (
        <Box
            margin="32px"
            style={{ fontSize: theme.fontSizes.text, fontFamily: "Open Sans" }}
        >
            <span style={{ color: theme.colors.secondary }}>
                <b>Question. </b>
            </span>
            {children}
        </Box>
    );
};

const Definition = ({ children, ...props }) => {
    return (
        <Box
            margin="32px"
            style={{ fontSize: theme.fontSizes.text, fontFamily: "Open Sans" }}
            {...props}
        >
            <span style={{ color: theme.colors.secondary }}>
                <b>Definition. </b>
            </span>
            {children}
        </Box>
    );
};

const Example = ({ children }) => {
    return (
        <Box
            margin="32px"
            style={{ fontSize: theme.fontSizes.text, fontFamily: "Open Sans" }}
        >
            <span style={{ color: theme.colors.secondary }}>
                <b>Example. </b>
            </span>
            {children}
        </Box>
    );
};

const Theorem = ({ label, children, ...props }) => {
    return (
        <Box
            margin="32px"
            style={{ fontSize: theme.fontSizes.text, fontFamily: "Open Sans" }}
            {...props}
        >
            <span style={{ color: theme.colors.secondary }}>
                <b>Theorem{typeof label == "string" ? ` [${label}]` : ""}. </b>
            </span>
            <i>{children}</i>
        </Box>
    );
};

const Lemma = ({ label, children, ...props }) => {
    return (
        <Box
            margin="32px"
            style={{ fontSize: theme.fontSizes.text, fontFamily: "Open Sans" }}
            {...props}
        >
            <span style={{ color: theme.colors.secondary }}>
                <b>Lemma{typeof label == "string" ? ` [${label}]` : ""}. </b>
            </span>
            <i>{children}</i>
        </Box>
    );
};