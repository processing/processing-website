import React from 'react';
import classNames from "classnames";
import * as grid from 'styles/grid.module.css';
import { Link } from "templates/download";
// https://www.svgrepo.com/svg/364975/users-three-fill
import CommunityIcon from 'images/community-icon.svg';
// https://www.svgrepo.com/svg/436169/pencil-tool-pen
import CreateIcon from 'images/create-icon.svg';
import GitHubIcon from 'images/github-icon.svg';
// https://www.svgrepo.com/svg/385324/education-book-learn-school-library
import LearnIcon from 'images/learn-icon.svg';
import * as css from 'styles/templates/download.module.css';
import { useIntl } from 'react-intl';

export default function MoreInfoLinks() {
    const intl = useIntl();
    return (
        <ul className={classNames(grid.col, css.bottomLinks)} style={{ flexBasis: 'var(--col8)' }}>
            <Link
                title={intl.formatMessage({ id: 'getStartedTitle' })}
                description={intl.formatMessage({ id: 'getStartedDescription' })}
                href="https://hello.processing.org/"
                icon={<CreateIcon />}
            />

            <Link
                title={intl.formatMessage({ id: 'tutorialsTitle' })}
                description={intl.formatMessage({ id: 'tutorialsDescription' })}
                href="https://processing.org/tutorials"
                icon={<LearnIcon />}
            />

            <Link
                title={intl.formatMessage({ id: 'communityTitle' })}
                description={intl.formatMessage({ id: 'communityDescription' })}
                href="https://discourse.processing.org/"
                icon={<CommunityIcon />}
            />

            <Link
                title={intl.formatMessage({ id: 'contributeTitle' })}
                description={intl.formatMessage({ id: 'contributeDescription' })}
                href="https://github.com/processing/processing4"
                icon={<GitHubIcon />}
            />
        </ul>
    )
}